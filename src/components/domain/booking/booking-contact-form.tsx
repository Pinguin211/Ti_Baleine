'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingContactSchema, type ContactClient } from '../../../schemas/validation/booking-contact.schema';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export interface BookingContactFormProps {
  onSubmit: (contact: ContactClient) => void;
}

export function BookingContactForm({ onSubmit }: BookingContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactClient>({ resolver: zodResolver(bookingContactSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
      <label className="text-sm text-marine-800">
        Prénom
        <Input {...register('prenom')} />
        {errors.prenom && <p className="text-sm text-coral-600">{errors.prenom.message}</p>}
      </label>
      <label className="text-sm text-marine-800">
        Nom
        <Input {...register('nom')} />
        {errors.nom && <p className="text-sm text-coral-600">{errors.nom.message}</p>}
      </label>
      <label className="text-sm text-marine-800">
        E-mail
        <Input type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-coral-600">{errors.email.message}</p>}
      </label>
      <label className="text-sm text-marine-800">
        Mobile (+262 6xx xxx xxx)
        <Input {...register('telephone')} placeholder="+262692000000" />
        {errors.telephone && <p className="text-sm text-coral-600">{errors.telephone.message}</p>}
      </label>
      <Button type="submit" className="mt-2">
        Continuer
      </Button>
    </form>
  );
}
