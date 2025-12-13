'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const WHATSAPP_NUMBER_INTL = '2349150459964'; // +2349150459964 without plus

export function ContactForm() {
	const [submitting, setSubmitting] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = (formData.get('name') || '').toString();
		const email = (formData.get('email') || '').toString();
		const phone = (formData.get('phone') || '').toString();
		const message = (formData.get('message') || '').toString();

		const text = `New enquiry from Gods Promise Aluminium website:%0A%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;

		const url = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(
			text
		)}`;

		setSubmitting(true);

		try {
			window.open(url, '_blank', 'noopener,noreferrer');
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form
			className='space-y-4'
			onSubmit={handleSubmit}
		>
			<div className='space-y-2'>
				<Label htmlFor='name'>Full Name *</Label>
				<Input
					id='name'
					name='name'
					placeholder='Enter your full name'
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='email'>Email Address *</Label>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='your.email@example.com'
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='phone'>Phone Number *</Label>
				<Input
					id='phone'
					name='phone'
					type='tel'
					placeholder='e.g. 0915 045 9964'
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='message'>Your Message *</Label>
				<Textarea
					id='message'
					name='message'
					placeholder='Tell us about your building, roof size (if known), and the products or services you are interested in.'
					rows={5}
					required
				/>
			</div>

			<Button
				type='submit'
				className='w-full'
				size='lg'
				disabled={submitting}
			>
				<Send className='mr-2 h-4 w-4' />
				{submitting ? 'Opening WhatsApp		' : 'Send via WhatsApp'}
			</Button>

			<p className='text-center text-xs text-muted-foreground'>
				When you submit, we open WhatsApp with your details so you can
				send them directly to us at +234 5150459964.
			</p>
		</form>
	);
}
