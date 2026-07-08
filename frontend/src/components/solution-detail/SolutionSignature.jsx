import SignatureCalculator from './SignatureCalculator'

// Dispatches the per-page "signature" block by type. Each solution page gets
// exactly one, tuned to its topic. Add new types here as pages need them.
const SIGNATURES = {
  calculator: SignatureCalculator,
}

export default function SolutionSignature({ signature }) {
  if (!signature) return null
  const Cmp = SIGNATURES[signature.type]
  if (!Cmp) return null
  return <Cmp signature={signature} />
}
