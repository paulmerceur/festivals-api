const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    'https://ipnfajibmrzrpvypabkx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwbmZhamlibXJ6cnB2eXBhYmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxMzY2NDIsImV4cCI6MTk5MTcxMjY0Mn0.fQUzvqUU1v2q4PZwKh5nzOlP4jcLYnBHNFssWRcz8fw'
  )

module.exports = supabase