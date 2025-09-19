// src/lib/bluetoothSensors.ts
export class BluetoothSensorManager {
  private device: BluetoothDevice | null = null;
  
  // Check if Bluetooth is supported
  isBluetoothSupported(): boolean {
    return 'bluetooth' in navigator;
  }

  async connectToSensors() {
    // Check if Bluetooth is available
    if (!this.isBluetoothSupported()) {
      throw new Error('Bluetooth not supported in this browser');
    }

    try {
      // Type assertion to avoid TypeScript errors
      const bluetooth = (navigator).bluetooth as Bluetooth;
      
      this.device = await bluetooth.requestDevice({
        filters: [{ services: ['environmental_sensing'] }],
        optionalServices: ['battery_service']
      });

      const server = await this.device.gatt?.connect();
      if (!server) throw new Error('Failed to connect to GATT server');
      
      // Get temperature characteristic
      const service = await server.getPrimaryService('environmental_sensing');
      const tempCharacteristic = await service.getCharacteristic('temperature');
      const humidityCharacteristic = await service.getCharacteristic('humidity');
      
      // Read values
      const tempValue = await tempCharacteristic.readValue();
      const humidityValue = await humidityCharacteristic.readValue();
      
      return {
        temperature: this.parseTemperature(tempValue),
        humidity: this.parseHumidity(humidityValue)
      };
    } catch (error: unknown) {
      console.error('Bluetooth connection failed:', error);
      throw new Error(`Bluetooth connection failed: 'Unknown error'}`);
    }
  }
  
  private parseTemperature(data: DataView): number {
    // Bluetooth temperature is in signed 16-bit integer (0.01°C units)
    return data.getInt16(0, true) / 100;
  }
  
  private parseHumidity(data: DataView): number {
    // Bluetooth humidity is in unsigned 16-bit integer (0.01% units)
    return data.getUint16(0, true) / 100;
  }

  // Disconnect from device
  disconnect() {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.device = null;
  }
}