import React, { useState, useEffect } from "react";
import { View, Text, Switch, Alert, TouchableOpacity, TextInput, Pressable } from "react-native";
import { TempIcon, TimerIcon, CheckIcon, PencilIcon } from "./Icons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as TaskManager from "expo-task-manager";
import { useLocalSearchParams } from "expo-router";

export default function Settings() {
  const { waterflow_mac } = useLocalSearchParams();

  const [deviceName, setDeviceName] = useState("");

  // generate a range of temperatures dynamically
  const temperatures = [];
  for (let i = 20; i >= -10; i--) {
    temperatures.push({ label: `${i}°C`, value: `${i}` });
  }

  // DROPDOWN TEMPERATURE
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(null);
  const [items, setItems] = useState(temperatures);

  let autoClose = false;
  let autoCloseTemp = 0;

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

  // Switch for the temperature setting
  const [isTempEnabled, setTempEnabled] = useState(true);
  const toggleTempSwitch = () => {
      setTempEnabled(!isTempEnabled);
  }

  // TIME PICKER STATES
  const [pickerVisible, setPickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(true);

  // Para almacenar los timeouts activos
  const [scheduledTimers, setScheduledTimers] = useState([]);

  // Limpiar timers programados
  const clearScheduledTimers = () => {
    scheduledTimers.forEach((timer) => clearTimeout(timer));
    setScheduledTimers([]);
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
    const formatTimeInt = (time) => {
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      return parseInt(hours + minutes, 10);
    };

    const startTimeInt = formatTimeInt(startTime);
    const endTimeInt = formatTimeInt(endTime);
    

    if(isTempEnabled){
      autoClose = isTempEnabled;
      autoCloseTemp = tempValue;
    } else {
      autoClose = false;
      autoCloseTemp = 0;
    }

    const settings = {
      waterflow_mac: waterflow_mac,
      name: deviceName,
      autoClose: autoClose,
      autoCloseTemp: autoCloseTemp,
      start_time: startTimeInt,
      end_time: endTimeInt,
    };

    console.log('CONFIGURACION SETEADA: ', settings)

    Alert.alert("Configuración guardada correctamente.");
  };

  // Mostrar selector de tiempo
  const mostrarSelectorTiempo = () => {
    if (!isTimerEnabled) {
      Alert.alert("Aviso", "Debe activar la programación horaria primero");
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
    <View className="flex-1 items-center gap-4 py-10 px-6 bg-gray-100">
      {/* HEADER */}
      <Text className="font-extrabold text-center text-[38px] text-[#1E3441] mb-5">
        Configuración
      </Text>

      <View className="flex gap-4 pl-2 w-full">
        <View className="flex-row gap-3 items-center justify-start">
          <PencilIcon size={30} color="#1E3441" />
          <Text className="text-black font-bold text-xl">Nombre del dispositivo:</Text>
        </View>
          <TextInput className="bg-gray-200 border-gray-300 border-2 rounded-full px-4 h-14 w-full" placeholder='Nombre del dispositivo' onChangeText={setDeviceName} />
      </View>

        {/* auto close temperature */}
        <View className="flex-row justify-start items-center gap-3">
            <TempIcon size={35} color="#1E3441" />
            <Text className="font-bold text-xl text-[#1E3441]">
              Cierre automático por temperatura:
            </Text>
            <Switch
            trackColor={{ false: "#ccc", true: "#185EFB" }}
            thumbColor={isTimerEnabled ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTempSwitch}
            value={isTempEnabled}
            style={{ transform: [{ scale: 1.3 }] }}
          />
          </View>

        {isTempEnabled && (
          <View className="flex gap-4">
            
            <DropDownPicker
              open={open}
              value={tempValue}
              items={items}
              setOpen={setOpen}
              setValue={setTempValue}
              setItems={setItems}
              placeholder="-1°C"
              style={{
                backgroundColor: "rgba(190, 190, 190, 0.2)",
                borderColor: "#d1d5db",
                borderWidth: 2,
                borderRadius: 20,
              }}
              dropDownContainerStyle={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "#d1d5db",
                borderWidth: 2,
                borderRadius: 20,
              }}
              textStyle={{
                fontSize: 16,
                color: "#000",
              }}
            />
          </View>
          )}
        
        {/* HORARIO */}
      <View className="flex gap-4 w-full items-center">
        <View className="flex-row justify-center items-center gap-3">
          <TimerIcon size={35} color="#1E3441" />
          <Text className="font-bold text-[23px] text-[#1E3441]">
            Programación horaria:
          </Text>
          <Switch
            trackColor={{ false: "#ccc", true: "#185EFB" }}
            thumbColor={isTimerEnabled ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTimerSwitch}
            value={isTimerEnabled}
            style={{ transform: [{ scale: 1.3 }] }}
          />
        </View>

        {/* Mostrar configuración solo si el timer está activado */}
        {isTimerEnabled && (
          <View className="flex justify-center items-center w-60 mt-4 gap-8">
            <View className="flex flex-row items-center gap-8">
              {/* Botón: Elegir rango horario */}
              <TouchableOpacity
                onPress={mostrarSelectorTiempo}
                className="bg-blue-600 px-4 py-2 rounded-xl"
              >
                <Text className="text-white font-semibold text-center text-xl">
                  Elegir rango horario
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row items-center gap-10">
              <View className="flex gap-2">
                {/* Mostrar horas seleccionadas */}
                <Text className="text-center text-[#1E3441] font-medium text-xl border-b-2 border-[#CDCDCD] pb-2">
                  Cierre: {startTime.getHours().toString().padStart(2, "0")}:
                  {startTime.getMinutes().toString().padStart(2, "0")}
                </Text>
                <Text className="text-center text-[#1E3441] font-medium text-xl">
                  Apertura: {endTime.getHours().toString().padStart(2, "0")}:
                  {endTime.getMinutes().toString().padStart(2, "0")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={guardarConfiguracion}
                className="bg-green-600 p-3 rounded-full"
              >
                <CheckIcon size={26} color="#FFFFFF" className="rounde" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* DateTimePicker - Solo se muestra cuando pickerVisible es true */}
        {pickerVisible && (
          <View className="flex gap-4 items-center">
            <Text className="text-[#1E3441] font-bold text-lg">
              {isSelectingStartTime
                ? "Seleccionar hora de cierre:"
                : "Seleccionar hora de apertura:"}
            </Text>
            <DateTimePicker
              value={isSelectingStartTime ? startTime : endTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
            <TouchableOpacity
              onPress={() => {
                setPickerVisible(false);
                setIsSelectingStartTime(true);
              }}
              className="bg-red-600 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold text-center">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View>
          {/* Here goes the setup settings button */}
        </View>
      </View>
    </View>
  );
}
