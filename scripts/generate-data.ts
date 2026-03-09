import Anthropic from '@anthropic-ai/sdk'
import { config } from 'dotenv'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

config()

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUTPUT_DIR = join(__dirname, '..', 'src', 'data', 'rankings')

const topics = [
  { number: 1, id: 'happiness', question: 'この世界で最も多くの人の幸福に寄与している組織', shortTitle: '幸福に寄与する組織', category: '幸福', emoji: '😊', unit: '推定受益者数' },
  { number: 2, id: 'danger', question: 'この世界で最も死亡率の高い職業', shortTitle: '危険な職業', category: '危険', emoji: '💀', unit: '10万人あたり死亡者数' },
  { number: 3, id: 'salary', question: 'この世界で最も平均年収の高い企業', shortTitle: '高年収企業', category: '金持ち', emoji: '💰', unit: '平均年収（USD）' },
  { number: 4, id: 'poverty', question: 'この世界で最も稼げない職業', shortTitle: '低収入な職業', category: '貧困', emoji: '😢', unit: '平均年収（USD）' },
  { number: 5, id: 'pollution', question: 'この世界で最も空気の汚い都市', shortTitle: '大気汚染都市', category: '環境', emoji: '🏭', unit: 'PM2.5年間平均（μg/m³）' },
  { number: 6, id: 'longevity', question: 'この世界で最も長生きする国', shortTitle: '長寿国', category: '長寿', emoji: '🧓', unit: '平均寿命（歳）' },
  { number: 7, id: 'sleep', question: 'この世界で最も寝ていない国', shortTitle: '睡眠不足な国', category: '睡眠', emoji: '😴', unit: '平均睡眠時間（時間）' },
  { number: 8, id: 'safety', question: 'この世界で最も犯罪が少ない国', shortTitle: '安全な国', category: '安全', emoji: '🛡️', unit: '犯罪指数（低いほど安全）' },
  { number: 9, id: 'coffee', question: 'この世界で最もコーヒーを飲む国', shortTitle: 'コーヒー消費国', category: '嗜好', emoji: '☕', unit: '1人あたり年間消費量（kg）' },
  { number: 10, id: 'language', question: 'この世界で最も消滅しそうな言語', shortTitle: '消滅危機言語', category: '言語', emoji: '📜', unit: '残存話者数' },
  { number: 11, id: 'space', question: 'この世界で最も宇宙ゴミを出している国', shortTitle: '宇宙ゴミ排出国', category: '宇宙', emoji: '🛰️', unit: '追跡可能なデブリ数' },
  { number: 12, id: 'unhappiness', question: 'この世界で最も幸福度が低い国', shortTitle: '不幸な国', category: '不幸', emoji: '😞', unit: '世界幸福度スコア' },
  { number: 13, id: 'building', question: 'この世界で最も高い建物', shortTitle: '超高層建築', category: '建築', emoji: '🏗️', unit: '高さ（m）' },
  { number: 14, id: 'alcohol', question: 'この世界で最もアルコール消費量が多い国', shortTitle: '飲酒量の多い国', category: '依存', emoji: '🍺', unit: '1人あたり年間消費量（リットル）' },
  { number: 15, id: 'education', question: 'この世界で最も大学進学率が低い国', shortTitle: '低進学率国', category: '教育', emoji: '📚', unit: '大学進学率（%）' },
  { number: 16, id: 'loneliness', question: 'この世界で最も一人暮らし率が高い国', shortTitle: '一人暮らし大国', category: '孤独', emoji: '🏠', unit: '一人暮らし世帯割合（%）' },
  { number: 17, id: 'traffic', question: 'この世界で最も渋滞がひどい都市', shortTitle: '渋滞都市', category: '渋滞', emoji: '🚗', unit: '年間渋滞時間（時間）' },
  { number: 18, id: 'calorie', question: 'この世界で最もカロリー摂取量が多い国', shortTitle: 'カロリー大国', category: '食', emoji: '🍔', unit: '1人1日あたり摂取量（kcal）' },
  { number: 19, id: 'labor', question: 'この世界で最も労働時間が長い国', shortTitle: '長時間労働国', category: '労働', emoji: '⏰', unit: '年間平均労働時間' },
  { number: 20, id: 'extinction', question: 'この世界で最も絶滅危惧種が多い国', shortTitle: '絶滅危惧種大国', category: '絶滅', emoji: '🦏', unit: '絶滅危惧種数' },
]

const systemPrompt = `あなたはデータリサーチの専門家です。与えられた質問に対して、信頼性の高いデータに基づいたランキングをJSON形式で回答してください。

回答は以下のJSON形式で返してください（他のテキストは一切含めないこと）:
{
  "items": [
    {
      "rank": 1,
      "name": "名称",
      "value": "数値と単位を含む表示用テキスト",
      "numericValue": 数値（バーチャート用、数値化できない場合はnull）,
      "description": "50文字以内の簡潔な説明",
      "country": "国名または国際",
      "flag": "国旗絵文字またはカテゴリ絵文字"
    }
  ],
  "source": "出典情報（WHO, World Bank等）",
  "lastUpdated": "2025"
}

ルール:
- 必ず10個のエントリーを返す（1位から10位まで）
- データは最新の公開統計・報告書に基づくこと
- numericValueは同じ単位で統一し、バーチャートの相対比較に使える数値にする
- descriptionは日本語で簡潔に
- nameは日本語で（固有名詞は原語併記可）
- JSON以外のテキストを含めないこと`

async function generateRanking(topic: typeof topics[0]) {
  const filename = `${String(topic.number).padStart(2, '0')}-${topic.id}.json`
  console.log(`Generating: ${filename} - ${topic.question}`)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `質問: ${topic.question}\n単位: ${topic.unit}\nカテゴリ: ${topic.category}`,
      },
    ],
  })

  let text = message.content[0].type === 'text' ? message.content[0].text : ''
  // Strip markdown code fences if present
  text = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim()
  const data = JSON.parse(text)

  const output = {
    id: topic.id,
    number: topic.number,
    question: topic.question,
    shortTitle: topic.shortTitle,
    category: topic.category,
    emoji: topic.emoji,
    unit: topic.unit,
    source: data.source,
    lastUpdated: data.lastUpdated,
    items: data.items,
  }

  const filepath = join(OUTPUT_DIR, filename)
  writeFileSync(filepath, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`  Saved: ${filepath}`)
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  console.log('Starting data generation...\n')

  for (const topic of topics) {
    try {
      await generateRanking(topic)
    } catch (err) {
      console.error(`  Error generating ${topic.id}:`, err)
    }
    await new Promise((r) => setTimeout(r, 2000))
  }

  console.log('\nDone!')
}

main()
