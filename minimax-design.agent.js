// MiniMax Design (design.minimax.io) as a magpie agent.
//
// MiniMax Design's custom text models live in a plain JSON file:
//   %APPDATA%\@hilo\desktop\hub-config.json  (electron app id @hilo)
// under config.customModels.<entry-id>, each entry shaped like:
//   { protocol, providerName, baseUrl, apiKey, models: [{ id, contextWindow, maxOutputTokens, reasoningLevels }] }
// protocols Design understands: "openai-compatible" | "openai-responses" | "anthropic"
// magpie's gateway serves all three, so this plugin writes one entry pointing
// at magpie's OpenAI-compatible endpoint, and refreshes the model list
// automatically whenever magpie's models change (magpie re-calls connect).
export const agent = {
  id: "minimax-design",
  name: "MiniMax Design",
  icon: "https://design.minimax.io/favicon.ico",
  config: "$APPDATA/@hilo/desktop/hub-config.json",
  format: "json",
  // no `model` key: Design picks its model in its own UI, so this row is a switch
  dir: "$LOCALAPPDATA/Programs/MiniMax Design",
  notice:
    "Windows only 仅限 Windows — quit MiniMax Design before connecting, restart it after（连接前退出、连接后重启）",
}

// magpie model fields -> Design's custom-model entry fields
function toDesignModel(m) {
  if (!m || !m.id) return null
  const out = { id: m.id }
  if (m.context) out.contextWindow = m.context
  if (m.output) out.maxOutputTokens = m.output
  if (m.efforts && m.efforts.length) out.reasoningLevels = m.efforts
  return out
}

export function connect({ gateway, models }) {
  const list = []
  for (const m of models || []) {
    const d = toDesignModel(m)
    if (d) list.push(d)
  }
  return {
    "config.customModels.user-custom-magpie.protocol": "openai-compatible",
    "config.customModels.user-custom-magpie.providerName": "Magpie",
    "config.customModels.user-custom-magpie.baseUrl": gateway.v1,
    "config.customModels.user-custom-magpie.apiKey": gateway.key,
    "config.customModels.user-custom-magpie.models": list,
  }
}
