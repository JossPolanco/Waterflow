import { View, Text, Switch, Alert, TouchableOpacity, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TempIcon, TimerIcon, CheckIcon, PencilIcon } from "./Icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import ApiEndpoint from "../utils/endpointAPI";
import { useState, useEffect } from "react";

export default function Settings() {
  const endpoint = ApiEndpoint();
  const { waterflow_mac } = useLocalSearchParams();
  const [deviceName, setDeviceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);    
  const [wfSettings, setWfSettings] = useState()
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);  
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchWfSettings()    
  }, [])

  useEffect(() => {
  if (wfSettings !== undefined) {       
    setValues(wfSettings.autoClose, wfSettings.autoCloseTemp, wfSettings.name)
  }
}, [wfSettings]);

  function setValues(autoClose, autoCloseTemp, name){
      setTempEnabled(autoClose);
      setTempValue(autoCloseTemp.toString());
      setDeviceName(name);      
  }

  async function fetchWfSettings() {
    setIsLoading(true);

    try {
      const response = await fetch(endpoint + `/waterflow/get-configuration?mac_address=${waterflow_mac}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },        
      })

      const result = await response.json()

      if(result.status == 'successfuly'){
        setWfSettings(result.results)
        // setValues()        
      }  
    } catch (error) {
      console.log('Error found: ', error)
    }
    finally {
      setIsLoading(false);      
    }
  }

  async function setSettings(settings) {    
    const response = await fetch(endpoint + '/waterflow/set-configuration', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })

    const result = await response.json();    

    if(result.status == 'successfuly') {      
      Alert.alert("Configuración exitosa", "Configuración guardada correctamente.");
      setSaveBtnDisabled(false);
      router.back()
    } else {
      console.log(result.message)
      Alert.alert("Error", "Ocurrió un error al guardar la configuración.");
      setSaveBtnDisabled(false);
    }
  }

  // generate a range of temperatures dynamically
  const temperatures = [];
  for (let i = 20; i >= -10; i--) {
    temperatures.push({ label: `${i}°C`, value: `${i}` });
  }

  // DROPDOWN TEMPERATURE
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState();
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
  const [isTempEnabled, setTempEnabled] = useState(false);
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
    setSaveBtnDisabled(true)
    console.log('GUARDASTE')
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
      mac_address: waterflow_mac,
      name: deviceName,
      autoClose: autoClose,
      autoCloseTemp: autoCloseTemp
    };

    setSettings(settings)
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

  const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

  return (
    

      <View className="justify-center items-center px-6 gap-4 bg-gray-100" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {/* shows this while is loading all the devices */}
        {isLoading && (
            <View className="mt-5">
                <Text className="text-gray-500">Cargando dispositivos...</Text>
            </View>
        )}

        {!isLoading && (
          <View className="w-full">
              <View className="flex gap-4 pl-2 w-full">
          <View className="flex-row gap-3 items-center justify-start">
            <PencilIcon size={30} color="#1E3441" />
            <Text className="text-black font-bold text-xl">Nombre del dispositivo:</Text>
          </View>
            <TextInput className="bg-gray-200 border-gray-300 border-2 rounded-full px-4 h-14 w-full" style={{ color: "#1e293b" }} placeholder='Nombre del dispositivo' onChangeText={setDeviceName} value={deviceName} placeholderTextColor="#94a3b8"/>
        </View>

          {/* auto close temperature */}
          <View className="flex-row justify-start items-center gap-4 mt-3">
              <TempIcon size={35} color="#1E3441" />
              <Text className="font-bold text-[#1E3441]">
                Cierre automático por temperatura:
              </Text>
              <Switch
              trackColor={{ false: "#ccc", true: "#185EFB" }}
              thumbColor={isTimerEnabled ? "#FFFFFF" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTempSwitch}
              value={isTempEnabled}
              style={{ transform: [{ scale: 1 }] }}
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
                placeholderTextColor="#94a3b8"
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
      
        {/* <View className="flex gap-4 w-full items-center">
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

          {isTimerEnabled && (
            <View className="flex justify-center items-center w-60 mt-4 gap-8">
              <View className="flex flex-row items-center gap-8">              
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
          )} */}

          {saveBtnDisabled && (
            <View className="flex-1 w-full items-center mt-4">
              <Pressable disabled={true} className="bg-blue-700 rounded-2xl py-4 items-center mt-2 w-32 h-12">
                  <Text className="text-white text-base font-semibold text-center">Guardar</Text>
              </Pressable>
            </View>
          )}

          {!saveBtnDisabled && (
            <View className="flex-1 w-full items-center mt-4">
              <Pressable disabled={false} className="bg-blue-500 rounded-2xl py-4 items-center mt-2 w-32 h-12 active:bg-blue-700" onPress={guardarConfiguracion}>
                  <Text className="text-white text-base font-semibold text-center">Guardar</Text>
              </Pressable>
            </View>
          )}
          </View>
      )}
      </View>
    
  );
}
