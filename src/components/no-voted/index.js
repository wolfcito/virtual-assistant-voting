import React from 'react'
import { Stack, Image, Button, Text, Flex } from '@chakra-ui/react'

const NoVoted = ({
  imageSrc,
  voteFee,
  virtualitoNFTs,
  isVoting,
  keepVote,
  children,
}) => {
  return (
    <Stack>
      <Text color={'gray.500'}>
        - Remind this transaction have a cost {voteFee}.
        <br />
        - It work in Görli and with MetaMask
        <br />
      </Text>
      <Image src={imageSrc} width={150} />
      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Flex
          flex={1}
          direction="column"
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <br />
          {children}
          <br />
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            colorScheme={'purple'}
            bg={'purple.500'}
            _hover={{ bg: 'purple.400' }}
            disabled={!virtualitoNFTs}
            onClick={keepVote}
            isLoading={isVoting}
          >
            Vote
          </Button>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default NoVoted
