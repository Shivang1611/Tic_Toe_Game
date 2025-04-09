import React from 'react'
import type { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text } from 'react-native'


type IconProps = PropsWithChildren<{
    name: string
    
    }>

const Icons: React.FC<IconProps> = ({ name }) => {
  switch (name) {
    case 'cross':
      return <Icon name="times" size={30} color="#900" />
    case 'circle':
      return <Icon name="circle" size={30} color="#900" />
    default:
      return <Text>Unknown icon</Text>
  }
}

export default icons