import SignatureCalculator from './SignatureCalculator'
import SignatureChat from './SignatureChat'
import SignatureMonitor from './SignatureMonitor'

// Dispatches the per-page "signature" block by type. Each solution page gets
// exactly one, tuned to its topic. Add new types here as pages need them.
const SIGNATURES = {
  calculator: SignatureCalculator,
  chat: SignatureChat,
  monitor: SignatureMonitor,
}

export default function SolutionSignature({ signature }) {
  if (!signature) return null
  const Cmp = SIGNATURES[signature.type]
  if (!Cmp) return null
  // Key by the signature's identity so switching solution pages client-side
  // remounts with fresh state instead of reusing the previous page's instance.
  const key = signature.eyebrow || (signature.inputs || []).map((i) => i.key).join('|')
  return <Cmp key={key} signature={signature} />
}
