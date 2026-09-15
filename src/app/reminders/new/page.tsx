'use client';

import React from 'react';
import { ReminderForm } from '@/components/reminders/ReminderForm';

export default function NewReminderPage() {
  return <ReminderForm isEditing={false} />;
}
