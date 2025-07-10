import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert, TouchableOpacity  } from "react-native";
import { TempIcon, TimerIcon, CheckIcon } from "./Icons"; 
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

// Nombre de la tarea en background
const BACKGROUND_TASK = 'waterflow-close-valve';

// Lógica cuando se ejecuta en background
TaskManager.defineTask(BACKGROUND_TASK, async () => {
  console.log('⏳ Ejecutando tarea en background: cerrar válvula');
  // Aquí puedes hacer una petición a tu backend o cerrar la válvula
  return BackgroundFetch.BackgroundFetchResult.NewData;
}); 

export default function Settings() {
  // DROPDOWN TEMPERATURE
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '2°C', value: '2' },
    { label: '1°C', value: '1' },
    { label: '0°C', value: '0' },
    { label: '-1°C', value: '-1' },
  ]);

  // SWITCH FOR TIME SCHEDULING
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);
  const toggleTimerSwitch = () => {
    setIsTimerEnabled(!isTimerEnabled);
    // Si se desactiva el timer, ocultar el picker y limpiar timers
    if (isTimerEnabled) {
      setPickerVisible(false);
      clearScheduledTimers();
    }
  };

  // TIME PICKER STATES
  const [pickerVisible, setPickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(true);
  
  // Para almacenar los timeouts activos
  const [scheduledTimers, setScheduledTimers] = useState([]);

  // Simular cierre/apertura
  const activarLlave = (activar) => {
    const message = activar ? '🔓 Válvula abierta' : '🔒 Válvula cerrada';
    Alert.alert('Estado de la válvula', message);
    console.log(activar ? 'Abrir válvula' : 'Cerrar válvula');
  };

  // Limpiar timers programados
  const clearScheduledTimers = () => {
    scheduledTimers.forEach(timer => clearTimeout(timer));
    setScheduledTimers([]);
  };

  // Calcular próxima ocurrencia de una hora específica
  const getNextOccurrence = (targetTime) => {
    const now = new Date();
    const next = new Date();
    next.setHours(targetTime.getHours(), targetTime.getMinutes(), 0, 0);
    
    // Si la hora ya pasó hoy, programar para mañana
    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }
    
    return next;
  };

  // Planificar timers
  const scheduleTimers = () => {
    // Limpiar timers anteriores
    clearScheduledTimers();
    
    const now = new Date();
    const nextCloseTime = getNextOccurrence(startTime);
    const nextOpenTime = getNextOccurrence(endTime);
    
    const closeDelay = nextCloseTime - now;
    const openDelay = nextOpenTime - now;
    
    const timers = [];
    
    // Programar cierre
    if (closeDelay > 0) {
      const closeTimer = setTimeout(() => {
        activarLlave(false);
        console.log('Timer ejecutado: Cerrar válvula');
      }, closeDelay);
      timers.push(closeTimer);
    }
    
    // Programar apertura
    if (openDelay > 0) {
      const openTimer = setTimeout(() => {
        activarLlave(true);
        console.log('Timer ejecutado: Abrir válvula');
      }, openDelay);
      timers.push(openTimer);
    }
    
    setScheduledTimers(timers);
  };

  // Registrar tarea en segundo plano
  const planificarEnBackground = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
        minimumInterval: 60 * 60, // 1 hora
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log('✅ Tarea en background registrada');
    } catch (err) {
      console.error('❌ No se pudo registrar la tarea en background:', err);
    }
  };

  // Manejar cambio en el DateTimePicker
  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      if (isSelectingStartTime) {
        setStartTime(selectedTime);
        setIsSelectingStartTime(false); // Cambiar a selección de hora de fin
      } else {
        setEndTime(selectedTime);
        setPickerVisible(false); // Ocultar picker después de seleccionar ambas horas
        setIsSelectingStartTime(true); // Resetear para próxima vez
      }
    }
  };

  // Guardar configuración
  const guardarConfiguracion = () => {
    if (!isTimerEnabled) {
      Alert.alert('Error', 'Debe activar la programación horaria primero');
      return;
    }

    scheduleTimers();
    planificarEnBackground();
    
    const formatTimeInt = (time) => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return parseInt(hours + minutes, 10);
    };
    
    const startTimeInt = formatTimeInt(startTime);
    const endTimeInt = formatTimeInt(endTime);

    Alert.alert(
      'Programación Guardada',
      `La válvula se cerrará a las ${startTimeInt} y se abrirá a las ${endTimeInt}`
    );

    console.log('DATA TO INSERT: ', startTimeInt, ' ', endTimeInt, 'extra: ', value)
  };

  // Mostrar selector de tiempo
  const mostrarSelectorTiempo = () => {
    if (!isTimerEnabled) {
      Alert.alert('Aviso', 'Debe activar la programación horaria primero');
      return;
    }
    setPickerVisible(true);
    setIsSelectingStartTime(true);
  };

  // Limpiar timers al desmontar el componente
  useEffect(() => {
    return () => {
      clearScheduledTimers();
    };
  }, []);

  return (
    <View className='flex-1 items-center py-10 px-6 bg-white'>
      
      {/* HEADER */}
      <Text className='font-extrabold text-center text-[38px] text-[#1E3441] mb-10'>
        Configuración
      </Text>

      {/* TEMPERATURA */}
      <View className='flex gap-4 mb-14'>
        <View className='flex-row justify-center items-center gap-3'>
          <TempIcon size={35} color='#1E3441' />
          <Text className='font-bold text-[23px] text-[#1E3441]'>
            Aviso de baja temperatura:
          </Text>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="-1°C"
          style={{
            backgroundColor: 'rgba(190, 190, 190, 0.2)',
            borderColor: '#CDCDCD',
            borderWidth: 2,
            borderRadius: 20,
          }}
          dropDownContainerStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#CDCDCD',
            borderWidth: 2,
            borderRadius: 20,
          }}
          textStyle={{
            fontSize: 16,
            color: '#000',
          }}
        />
      </View>

      {/* HORARIO */}
      <View className='flex gap-4 w-full items-center'>
        <View className='flex-row justify-center items-center gap-3'>
          <TimerIcon size={40} color='#1E3441'/>
          <Text className='font-bold text-[23px] text-[#1E3441]'>
            Programación horaria:
          </Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#185EFB'}}
            thumbColor={isTimerEnabled ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTimerSwitch}
            value={isTimerEnabled}
            style={{ transform: [{ scale: 1.3 }] }}
          />
        </View>
        
        {/* Mostrar configuración solo si el timer está activado */}
        {isTimerEnabled && (
          <View className='flex justify-center items-center w-60 mt-4 gap-8'>
            <View className='flex flex-row items-center gap-8'>
              {/* Botón: Elegir rango horario */}
              <TouchableOpacity 
                onPress={mostrarSelectorTiempo}
                className="bg-blue-600 px-4 py-2 rounded-xl"
              >
                <Text className="text-white font-semibold text-center text-xl">Elegir rango horario</Text>
              </TouchableOpacity>
            </View>

            <View className='flex flex-row items-center gap-10'>
              <View className='flex gap-2'>
                {/* Mostrar horas seleccionadas */}
                <Text className='text-center text-[#1E3441] font-medium text-xl border-b-2 border-[#CDCDCD] pb-2'>
                  Cierre: {startTime.getHours().toString().padStart(2, '0')}:{startTime.getMinutes().toString().padStart(2, '0')}
                </Text>
                <Text className='text-center text-[#1E3441] font-medium text-xl'>
                  Apertura: {endTime.getHours().toString().padStart(2, '0')}:{endTime.getMinutes().toString().padStart(2, '0')}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={guardarConfiguracion}
                className="bg-green-600 p-3 rounded-full"
              >
                <CheckIcon size={26} color="#FFFFFF" className='rounde'/>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* DateTimePicker - Solo se muestra cuando pickerVisible es true */}
        {pickerVisible && (
          <View className='flex gap-4 items-center'>
            <Text className='text-[#1E3441] font-bold text-lg'>
              {isSelectingStartTime ? 'Seleccionar hora de cierre:' : 'Seleccionar hora de apertura:'}
            </Text>
            <DateTimePicker
              value={isSelectingStartTime ? startTime : endTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
            <TouchableOpacity 
              onPress={() => {
                setPickerVisible(false)
                setIsSelectingStartTime(true)
              }}
              className="bg-red-600 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold text-center">Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}