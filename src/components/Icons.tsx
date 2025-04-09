import React from 'react'
import type { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text } from 'react-native'


type IconProps = PropsWithChildren<{
    name: string,
    size:number
    color:string
    
    }>

const Icons: React.FC<IconProps> = ({ name, size, color }) => {
  switch (name) {
    case 'cross':
      return <Icon name="times" size={size} color={color} />
    case 'circle':
      return <Icon name="circle" size={size} color={color} />
    default:
      return <Text>Unknown icon</Text>
  }
}

export default Icons