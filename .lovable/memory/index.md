Cureva healthcare platform - design system, architecture, and key decisions

## Design System
- Font: Poppins (heading) + Inter (body)
- Primary: HSL 214 100% 58% (medical blue)
- Secondary: HSL 174 73% 45% (teal)
- Medical green: HSL 160 84% 39%
- Uses semantic tokens from index.css, never hardcoded colors

## Architecture
- Auth: Supabase auth with AuthContext, Google/Apple OAuth via @lovable.dev/cloud-auth-js
- Roles: user_roles table with has_role() security definer function (admin/doctor/patient)
- Auto profile + patient role creation on signup via trigger
- AI Chatbot: Edge function "chat" using Lovable AI Gateway (Gemini 3 Flash)
- Voice: Web Speech API for input (SpeechRecognition) and output (SpeechSynthesis)
- Doctor avatars: Generated images in src/assets/doctors/, mapped via src/lib/doctorAvatars.ts

## Database Tables
profiles, user_roles, doctors, doctor_reviews, hospitals, hospital_rooms, procedure_pricing, government_schemes, ngo_services, chat_messages, appointments, medical_records

## Pages
/, /login, /register, /forgot-password, /reset-password, /admin-login, /admin, /home, /dashboard, /dashboard/*, /doctors, /hospital-pricing, /government-schemes, /symptom-checker, /consultation, /medical-records, /pharmacy, /lab-tests, /emergency, /health-awareness, /book-appointment, /doctor-register, /doctor-dashboard
