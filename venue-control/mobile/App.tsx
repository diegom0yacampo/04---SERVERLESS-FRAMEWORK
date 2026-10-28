import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { Zone, ZoneInput, ZoneStatus } from './src/types';
import { createZone, deleteZone, getZone, getZones, isCloud, replaceZone, updateZoneStatus } from './src/api';

type Screen =
  | { name: 'list' }
  | { name: 'detail'; id: string }
  | { name: 'new' }
  | { name: 'edit'; zone: Zone };

const STATUSES: ZoneStatus[] = ['OPEN', 'FULL', 'CLOSED'];

const statusColor: Record<ZoneStatus, string> = {
  OPEN: '#3DDC84',
  FULL: '#FFB020',
  CLOSED: '#FF5C5C'
};

const nextStatus: Record<ZoneStatus, ZoneStatus> = {
  OPEN: 'FULL',
  FULL: 'CLOSED',
  CLOSED: 'OPEN'
};

const formatCapacity = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'list' });
  const [zones, setZones] = useState<Zone[]>([]);
  const [detail, setDetail] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState<ZoneStatus>('OPEN');

  async function loadZones() {
    setLoading(true);
    setError('');
    try {
      setZones(await getZones());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Error de red');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadZones();
  }, []);

  async function openDetail(id: string) {
    setScreen({ name: 'detail', id });
    setDetail(null);
    setConfirmDelete(false);
    setError('');
    setNotice('');
    try {
      setDetail(await getZone(id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Error de red');
    }
  }

  function openForm(zone?: Zone) {
    setName(zone?.name ?? '');
    setCapacity(zone ? String(zone.capacity) : '');
    setStatus(zone?.status ?? 'OPEN');
    setError('');
    setNotice('');
    setScreen(zone ? { name: 'edit', zone } : { name: 'new' });
  }

  async function run(task: () => Promise<void>) {
    setBusy(true);
    setError('');
    try {
      await task();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Error de red');
    } finally {
      setBusy(false);
    }
  }

  function readForm(): ZoneInput | null {
    const value = Number(capacity);
    if (!name.trim() || !Number.isFinite(value) || value <= 0) {
      setError('Escribe un nombre y una capacidad mayor que 0');
      return null;
    }
    return { name: name.trim(), capacity: value, status };
  }

  function save() {
    const input = readForm();
    if (!input) return;
    void run(async () => {
      if (screen.name === 'edit') {
        const saved = await replaceZone(screen.zone.id, input);
        setZones(current => current.map(zone => (zone.id === saved.id ? saved : zone)));
        setDetail(saved);
        setNotice('PUT · ' + saved.name + ' actualizada');
        setScreen({ name: 'detail', id: saved.id });
      } else {
        const created = await createZone(input);
        setZones(current => [...current, created]);
        setNotice('POST · ' + created.name + ' creada con id ' + created.id);
        setScreen({ name: 'list' });
      }
    });
  }

  function changeStatus(zone: Zone) {
    void run(async () => {
      const saved = await updateZoneStatus(zone.id, nextStatus[zone.status]);
      setZones(current => current.map(item => (item.id === saved.id ? saved : item)));
      setDetail(saved);
      setNotice('PATCH · estado ' + saved.status);
    });
  }

  function remove(zone: Zone) {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    void run(async () => {
      await deleteZone(zone.id);
      setZones(current => current.filter(item => item.id !== zone.id));
      setNotice('DELETE · ' + zone.name + ' eliminada');
      setScreen({ name: 'list' });
    });
  }

  function backToList() {
    setScreen({ name: 'list' });
    setError('');
  }

  const renderList = () => (
    <>
      <Text style={styles.kicker}>FESTIVAL OPERATIONS</Text>
      <Text style={styles.title}>ESPACIOS</Text>
      <Text style={styles.muted}>{zones.length} zonas · operación en directo</Text>
      {loading ? <ActivityIndicator color="#C6F432" /> : null}
      {zones.map(zone => (
        <Pressable key={zone.id} accessibilityRole="button" style={styles.card} onPress={() => void openDetail(zone.id)}>
          <View style={styles.cardTop}>
            <Text style={styles.cardName}>{zone.name.toUpperCase()}</Text>
            <Text style={styles.cardId}>{zone.id}</Text>
          </View>
          <Text style={styles.number}>{formatCapacity(zone.capacity)}</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.label}>CAPACIDAD</Text>
            <Text style={[styles.badge, { color: statusColor[zone.status] }]}>● {zone.status}</Text>
          </View>
        </Pressable>
      ))}
      <Pressable accessibilityRole="button" disabled={busy} style={styles.primary} onPress={() => openForm()}>
        <Text style={styles.primaryText}>＋ NUEVO ESPACIO</Text>
      </Pressable>
      <Pressable accessibilityRole="button" disabled={loading} style={styles.secondary} onPress={() => void loadZones()}>
        <Text style={styles.secondaryText}>{loading ? 'CARGANDO…' : 'RECARGAR'}</Text>
      </Pressable>
    </>
  );

  const renderDetail = () => (
    <>
      <Pressable accessibilityRole="button" onPress={backToList}>
        <Text style={styles.back}>← ESPACIOS</Text>
      </Pressable>
      {!detail ? (
        error ? null : <ActivityIndicator color="#C6F432" />
      ) : (
        <>
          <Text style={styles.cardId}>{detail.id}</Text>
          <Text style={styles.title}>{detail.name.toUpperCase()}</Text>
          <Text style={styles.label}>CAPACIDAD</Text>
          <Text style={styles.bigNumber}>{formatCapacity(detail.capacity)}</Text>
          <Text style={styles.label}>PERSONAS</Text>
          <Text style={[styles.status, { color: statusColor[detail.status], borderColor: statusColor[detail.status] }]}>
            ● {detail.status}
          </Text>
          <Text style={styles.section}>OPERACIONES</Text>
          <Pressable accessibilityRole="button" disabled={busy} style={styles.secondary} onPress={() => openForm(detail)}>
            <Text style={styles.secondaryText}>EDITAR ESPACIO</Text>
          </Pressable>
          <Pressable accessibilityRole="button" disabled={busy} style={styles.secondary} onPress={() => changeStatus(detail)}>
            <Text style={styles.secondaryText}>CAMBIAR ESTADO → {nextStatus[detail.status]}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" disabled={busy} style={styles.danger} onPress={() => remove(detail)}>
            <Text style={styles.dangerText}>{confirmDelete ? 'PULSA OTRA VEZ PARA ELIMINAR' : 'ELIMINAR'}</Text>
          </Pressable>
        </>
      )}
    </>
  );

  const renderForm = () => (
    <>
      <Pressable accessibilityRole="button" onPress={screen.name === 'edit' ? () => void openDetail(screen.zone.id) : backToList}>
        <Text style={styles.back}>← CANCELAR</Text>
      </Pressable>
      <Text style={styles.title}>{screen.name === 'edit' ? 'EDITAR\n' + screen.zone.name.toUpperCase() : 'NUEVO\nESPACIO'}</Text>
      <Text style={styles.label}>NOMBRE</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="River Stage" placeholderTextColor="#5C5F6B" />
      <Text style={styles.label}>CAPACIDAD</Text>
      <TextInput
        style={styles.input}
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
        placeholder="1800"
        placeholderTextColor="#5C5F6B"
      />
      <Text style={styles.label}>ESTADO</Text>
      <View style={styles.pills}>
        {STATUSES.map(item => (
          <Pressable
            key={item}
            accessibilityRole="button"
            style={[styles.pill, status === item && { borderColor: statusColor[item], backgroundColor: '#1B1D24' }]}
            onPress={() => setStatus(item)}
          >
            <Text style={[styles.pillText, { color: status === item ? statusColor[item] : '#8A8D99' }]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable accessibilityRole="button" disabled={busy} style={styles.primary} onPress={save}>
        <Text style={styles.primaryText}>
          {busy ? 'ENVIANDO…' : screen.name === 'edit' ? 'GUARDAR CAMBIOS' : 'CREAR ESPACIO'}
        </Text>
      </Pressable>
    </>
  );

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <View style={styles.bar}>
        <Text style={styles.brand}>VENUE CONTROL</Text>
        <Text style={styles.live}>● {isCloud ? 'CLOUD' : 'LOCAL'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {notice ? <Text style={styles.notice}>{notice}</Text> : null}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {screen.name === 'list' ? renderList() : null}
        {screen.name === 'detail' ? renderDetail() : null}
        {screen.name === 'new' || screen.name === 'edit' ? renderForm() : null}
        <Text style={styles.footnote}>Escrituras simuladas: los cambios se ven en pantalla hasta pulsar RECARGAR.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0B0B0F' },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#22242C'
  },
  brand: { color: '#FFFFFF', fontWeight: '900', letterSpacing: 3 },
  live: { color: '#C6F432', fontWeight: '800', letterSpacing: 1 },
  content: { padding: 24, gap: 12, width: '100%', maxWidth: 560, alignSelf: 'center' },
  kicker: { color: '#C6F432', fontWeight: '800', letterSpacing: 2, fontSize: 12 },
  title: { color: '#FFFFFF', fontSize: 38, fontWeight: '900', lineHeight: 42 },
  muted: { color: '#8A8D99', marginBottom: 8 },
  card: { backgroundColor: '#14151B', borderRadius: 14, borderWidth: 1, borderColor: '#22242C', padding: 18, gap: 4 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  cardName: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 1 },
  cardId: { color: '#5C5F6B', fontWeight: '700', fontSize: 12, letterSpacing: 1 },
  number: { color: '#FFFFFF', fontSize: 30, fontWeight: '900' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#8A8D99', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  badge: { fontWeight: '800', letterSpacing: 1 },
  back: { color: '#C6F432', fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
  bigNumber: { color: '#FFFFFF', fontSize: 56, fontWeight: '900' },
  status: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6, fontWeight: '800', marginTop: 8 },
  section: { color: '#8A8D99', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginTop: 16 },
  primary: { backgroundColor: '#C6F432', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  primaryText: { color: '#0B0B0F', fontWeight: '900', letterSpacing: 1 },
  secondary: { borderWidth: 1, borderColor: '#33353F', borderRadius: 10, padding: 15, alignItems: 'center' },
  secondaryText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 1 },
  danger: { borderWidth: 1, borderColor: '#FF5C5C', borderRadius: 10, padding: 15, alignItems: 'center' },
  dangerText: { color: '#FF5C5C', fontWeight: '800', letterSpacing: 1 },
  input: { backgroundColor: '#14151B', borderWidth: 1, borderColor: '#33353F', borderRadius: 10, color: '#FFFFFF', padding: 14, fontSize: 16 },
  pills: { flexDirection: 'row', gap: 8 },
  pill: { flex: 1, borderWidth: 1, borderColor: '#33353F', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  pillText: { fontWeight: '800', letterSpacing: 1 },
  notice: { color: '#C6F432', backgroundColor: '#1A2108', borderRadius: 10, padding: 12, fontWeight: '700' },
  error: { color: '#FFB4B4', backgroundColor: '#2A1214', borderRadius: 10, padding: 12, fontWeight: '700' },
  footnote: { color: '#5C5F6B', fontSize: 12, marginTop: 24, textAlign: 'center' }
});
