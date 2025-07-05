import React, { useState } from 'react';
import { View, Text, Switch, TextInput } from "react-native";
import { TempIcon, TimerIcon, ClockIcon } from "./Icons"; 
import DropDownPicker from 'react-native-dropdown-picker';

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '2°C', value: '2' },
    { label: '1°C', value: '1' },
    { label: '0°C', value: '0' },
    { label: '-1°C', value: '-1' },
  ]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

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
            thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scale: 1.3 }] }}
          />
        </View>
        <View className='flex flex-row justify-center items-center w-60 mt-4 gap-10'>
          <Text className='font-semibold text-2xl text-[#1E3441]'>Empezar</Text>
          <ClockIcon size={40} color='#1E3441'/>
          <Text className='font-semibold text-2xl text-[#1E3441]'>Finalizar</Text>
        </View>
      </View>
    </View>
  );
}
