import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const LAST_UPDATED = 'May 30, 2026'

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: `We collect information you provide directly: your name, email address, and the nutrition and fitness data you log (food entries, weight logs, workout sessions, and macro goals).\n\nWhen you use the scanner, images are sent to our AI service for analysis. Images are not stored after processing.\n\nWe collect standard usage data such as which features you use and when, to improve the app.`,
  },
  {
    title: 'How We Use Your Information',
    items: [
      'Provide personalized macro targets, AI coaching, and recipe recommendations',
      'Calculate and display your progress over time',
      'Send reminder notifications if you enable them',
      'Improve the accuracy and relevance of our AI features',
    ],
  },
  {
    title: 'Data Storage & Security',
    body: `Your data is stored securely using Supabase, a SOC 2 Type II certified database provider. All data is encrypted in transit and at rest. We apply row-level security so only your account can access your data.`,
  },
  {
    title: 'AI & Third-Party Services',
    body: `Trollii uses Anthropic's Claude API to power food analysis, recipe generation, and the AI coach. Food data submitted for analysis is sent to Anthropic's servers under their privacy policy. We do not share personally identifiable information with Anthropic.\n\nSubscriptions are processed by RevenueCat and the App Store / Google Play. We do not store payment card details.`,
  },
  {
    title: 'Data Sharing',
    body: `We do not sell, rent, or share your personal data with third parties for marketing purposes. We may share anonymized, aggregated data for analytics. We may disclose data if required by law.`,
  },
  {
    title: 'Your Rights & Account Deletion',
    body: `You can delete your account and all associated data at any time directly from the app: Profile → Settings → Delete Account & Data. Deletion is immediate and permanent.\n\nYou can also export your food logs as CSV from the Settings tab at any time.\n\nFor questions or manual deletion requests, email trollii.support@gmail.com.`,
  },
  {
    title: 'Contact',
    body: `Questions about this policy? Email us at trollii.support@gmail.com.`,
  },
]

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Trollii
        </Link>

        <h1 className="text-3xl font-bold mb-1">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <p className="text-slate-600 mb-10 leading-relaxed">
          Trollii is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.
        </p>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-semibold mb-2">{s.title}</h2>
              {s.items ? (
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 leading-relaxed">
                  {s.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{s.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
