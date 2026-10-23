import { AddressSnapshot } from '@namma-move/types';

export type MoveType = 'within_city' | 'intercity' | 'interstate';

export const MOVE_TYPE_LABEL: Record<MoveType, string> = {
  within_city: 'Within city',
  intercity: 'Intercity',
  interstate: 'Interstate',
};

// Suggests a type from the two cities. The customer can still change it.
export function suggestMoveType(pickup: AddressSnapshot, drop: AddressSnapshot): MoveType | null {
  if (!pickup.city || !drop.city) return null;
  if (pickup.city === drop.city) return 'within_city';
  if (pickup.state && drop.state && pickup.state !== drop.state) return 'interstate';
  return 'intercity';
}