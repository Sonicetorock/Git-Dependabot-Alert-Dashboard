import { Flex, StatGroup } from '@chakra-ui/react'
import React from 'react'
import StatBox from '../UI/StatBox'

const Content_Org = () => {
  return (
    <Flex w="80%" h="100svh" bg='gray.200' flexDirection='column' justifyContent='space-around' alignItems='start' p={1}>
    <StatGroup flexDirection='row' justifyContent='space-around' alignItems='start' w='50%' h='fit-content' bgColor='pink.200' p={3}>
      <StatBox statLabel="Low" statVal={20} statIncPercent="10" />
      <StatBox statLabel="Medium" statVal={20} statIncPercent="10" />
      <StatBox statLabel="High" statVal={20} statIncPercent="10" />
    </StatGroup>

    <StatGroup flexDirection='row' justifyContent='space-around' alignItems='start' w='50%' h='fit-content' bgColor='pink.200' p={3}>
      
      <StatBox statLabel="Runtime" statVal={20} statIncPercent="10" />
      <StatBox statLabel="Dev" statVal={20} statIncPercent="10" />
    </StatGroup>

    <StatGroup flexDirection='column' justifyContent='space-around' alignItems='start' w='50%' h='' bgColor='pink.200' p={3}>
      <StatGroup flexDirection='row' justifyContent='space-around' alignItems='start' w='100%'>
          <StatBox statLabel="Auto Dismissed" statVal={20} statIncPercent="10" />
          <StatBox statLabel="Dismissed" statVal={20} statIncPercent="10" />
      </StatGroup>

      <StatGroup flexDirection='row' justifyContent='space-around' alignItems='start' w='100%'>
          <StatBox statLabel="Fixed" statVal={20} statIncPercent="10" />
          <StatBox statLabel="Open" statVal={20} statIncPercent="10" />
      </StatGroup>
    </StatGroup>

   </Flex>
  )
}

export default Content_Org
