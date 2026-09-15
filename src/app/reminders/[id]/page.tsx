'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ReminderForm } from '@/components/reminders/ReminderForm';

export default function EditReminderPage() {
  const params = useParams();
  const id = params?.id as string;
  const { reminders } = useApp();

  const reminder = reminders.find((r) => r.id === id);

  return <ReminderForm initialReminder={reminder} isEditing={true} />;
}
