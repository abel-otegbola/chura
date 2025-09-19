// src/types/bluetooth.d.ts
interface BluetoothDevice {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
  watchingAdvertisements: boolean;
}

interface BluetoothRemoteGATTServer {
  device: BluetoothDevice;
  connected: boolean;
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic {
  readValue(): Promise<DataView>;
}

interface Bluetooth {
  requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
}

interface Navigator {
  bluetooth?: Bluetooth;
}

interface RequestDeviceOptions {
  filters: BluetoothLEScanFilter[];
  optionalServices?: string[];
}

interface BluetoothLEScanFilter {
  services?: string[];
  name?: string;
  namePrefix?: string;
  manufacturerData?: BluetoothManufacturerDataFilter[];
  serviceData?: BluetoothServiceDataFilter[];
}

interface BluetoothManufacturerDataFilter {
  companyIdentifier: number;
  dataPrefix?: BufferSource;
  mask?: BufferSource;
}

interface BluetoothServiceDataFilter {
  service: string;
  dataPrefix?: BufferSource;
  mask?: BufferSource;
}