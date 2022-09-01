import React from 'react'
import { Stack, Image, Badge, Flex } from '@chakra-ui/react'

const Voted = ({ imageSrc }) => {
  return (
    <Stack align={'center'}>
      <Image src={imageSrc} width={150} />
      <Flex mt={2}>
        <Badge ml={1} colorScheme="green">
          STATUS: Congratulations you have already voted
        </Badge>
      </Flex>
    </Stack>
  )
}

export default Voted
