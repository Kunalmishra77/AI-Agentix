/**
 * AI Agentix — website leads → Google Sheet.
 *
 * Paste this into the leads spreadsheet: Extensions → Apps Script → replace Code.gs → Save.
 * Then: Project Settings → Script properties → add LEADS_TOKEN = <the same long random value
 * you put in GOOGLE_SHEET_WEBHOOK_TOKEN on the server>. Deploy → New deployment → Web app,
 * Execute as: Me, Who has access: Anyone. Copy the /exec URL into GOOGLE_SHEET_WEBHOOK_URL.
 *
 * "Anyone" only means the URL accepts requests; every request without the secret token is
 * rejected and nothing in the sheet is readable through it.
 */
var SHEET_NAME = 'Leads';
var HEADERS = ['Received (UTC)', 'Lead ID', 'Form', 'Name', 'Phone', 'Email', 'Company', 'Details', 'Page', 'Campaign', 'Consent'];

// Run this ONCE from the editor (select "setupSheet" → Run). It asks for permission
// and creates the "Leads" tab with headers. Then deploy as a web app.
function setupSheet() {
  var sheet = getLeadsSheet();
  Logger.log('Ready: "' + sheet.getName() + '" in ' + sheet.getParent().getName());
}

// Works when the script was opened from the sheet (Extensions → Apps Script). If it was
// created separately, add a script property SHEET_ID = the long ID from the sheet's URL.
function getLeadsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    if (!id) throw new Error('Open this script from the Google Sheet, or set the SHEET_ID script property.');
    ss = SpreadsheetApp.openById(id);
  }
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var token = PropertiesService.getScriptProperties().getProperty('LEADS_TOKEN');
    if (!token || body.token !== token) return json({ ok: false, error: 'unauthorised' });
    if (!body.row || !body.row.length) return json({ ok: false, error: 'empty row' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sheet = getLeadsSheet();
      // Skip duplicates: the server retries until it gets ok, so a lead may arrive twice.
      var leadId = String(body.row[1]);
      var last = sheet.getLastRow();
      if (last > 1) {
        var ids = sheet.getRange(2, 2, last - 1, 1).getValues();
        for (var i = ids.length - 1; i >= 0 && i >= ids.length - 500; i--) {
          if (String(ids[i][0]) === leadId) return json({ ok: true, duplicate: true });
        }
      }
      sheet.appendRow(body.row.slice(0, HEADERS.length).map(String));
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
