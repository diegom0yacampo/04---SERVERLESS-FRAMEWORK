export type ZoneStatus = 'OPEN' | 'FULL' | 'CLOSED';

export interface Zone {
  id: string;
  name: string;
  capacity: number;
  status: ZoneStatus;
}

export type ZoneInput = Omit<Zone, 'id'>;

export const catalog: Zone[] = [
  { id: 'ZONE-01', name: 'Main Stage', capacity: 5000, status: 'OPEN' },
  { id: 'ZONE-04', name: 'Invernadero', capacity: 1800, status: 'OPEN' },
  { id: 'ZONE-07', name: 'Garden Stage', capacity: 2500, status: 'FULL' },
  { id: 'ZONE-09', name: 'Food Court', capacity: 1200, status: 'CLOSED' }
];

export const findZone = (id: string): Zone | undefined => catalog.find(zone => zone.id === id);

export const isStatus = (value: unknown): value is ZoneStatus =>
  value === 'OPEN' || value === 'FULL' || value === 'CLOSED';

const isName = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isCapacity = (value: unknown): value is number =>
  typeof value === 'number' && value > 0;

export function isZoneInput(value: Record<string, unknown> | null): value is ZoneInput {
  return value !== null && isName(value.name) && isCapacity(value.capacity) && isStatus(value.status);
}

export function readChanges(value: Record<string, unknown> | null): Partial<ZoneInput> | null {
  if (!value) return null;
  const changes: Partial<ZoneInput> = {};
  if ('name' in value) {
    if (!isName(value.name)) return null;
    changes.name = value.name.trim();
  }
  if ('capacity' in value) {
    if (!isCapacity(value.capacity)) return null;
    changes.capacity = value.capacity;
  }
  if ('status' in value) {
    if (!isStatus(value.status)) return null;
    changes.status = value.status;
  }
  return Object.keys(changes).length > 0 ? changes : null;
}
