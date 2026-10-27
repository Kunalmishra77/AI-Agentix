import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ruleBasedReply, detectLang } from '../src/intents.mjs'

const route = (q) => ruleBasedReply(q, []).action?.navigate ?? null
const reply = (q) => ruleBasedReply(q, []).reply

test('language detection', () => {
  assert.equal(detectLang('What services do you offer?'), 'en')
  assert.equal(detectLang('pricing kya hai?'), 'hinglish')
  assert.equal(detectLang('क्या आप WhatsApp bot बनाते हैं?'), 'hi')
})

test('common questions get the right answer and page', () => {
  assert.match(reply('pricing kya hai?'), /₹25,000/)
  assert.match(reply('kitne din me ho jayega'), /hafte|weeks/)
  assert.equal(route('How do I book a demo?'), '/contact')
  assert.equal(route('Do you work with hospitals?'), '/industries/healthcare')
  assert.equal(route('tell me about GST invoice reconciliation'), '/solutions/finance-accounts')
  assert.equal(route('क्या आप WhatsApp bot बनाते हैं?'), '/solutions/ai-voice-chat')
  assert.equal(route('who is the CEO'), '/about')
  assert.match(reply('what is your phone number'), /myai@ai-agentix\.com/)
  assert.equal(route('What services do you offer?'), '/solutions')
})

test('unknown questions point to contact options without inventing an answer', () => {
  assert.match(reply('what is the weather in Paris'), /WhatsApp/)
  assert.equal(route('what is the weather in Paris'), null)
})
