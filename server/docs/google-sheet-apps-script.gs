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

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var token = PropertiesService.getScriptProperties().getProperty('LEADS_TOKEN');
    if (!token || body.token !== token) return json({ ok: false, error: 'unauthorised' });
    if (!body.row || !body.row.length) return json({ ok: false, error: 'empty row' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      }
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
