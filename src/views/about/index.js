import React from 'react'
import { Stack, Heading, Text, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const About = () => {
  return (
    <Stack
      align={'flex-start'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 10, md: 18 }}
      direction={{ base: 'column-reverse', md: 'column' }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
        >
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '25%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'purple.300',
              zIndex: -1,
            }}
          >
            Goal
          </Text>
        </Heading>
        <Stack>
          <Text color={'gray.500'}>
            Create a DApp that allows people to vote on a (binary) proposal.
            Each ethereum address should be allowed to vote only once and the
            vote should cost 0.01 ETH.
          </Text>
          <Text color={'gray.500'}>
            When a user opens the page, it should see the result so far (number
            of positive votes vs. number of negative votes). Real-time updating
            is a bonus, but not required.
          </Text>

          <Text color={'gray.500'}>
            The app should consist only of a frontend. It should work in Görli
            and with MetaMask.
          </Text>

          <Text color={'gray.500'}>
            The contract is already deployed at
            0xacfc7725527ba2ee4311574f65e5d76f9f9585e9. You can see it{' '}
            <Link
              href="https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9#code"
              isExternal
              color="purple.500"
            >
              here <ExternalLinkIcon mx="2px" />
            </Link>
            .
          </Text>
        </Stack>
      </Stack>

      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
        >
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '25%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'purple.300',
              zIndex: -1,
            }}
          >
            Stack and tools
          </Text>
        </Heading>
        <Stack>
          <Text color={'gray.500'}>The only two requirements are:</Text>
          <Text color={'gray.500'}>
            1. Use React for the frontend
            <br />
            2. Use web3.js and ethers.js. The user should be able to switch
            between the two libraries and everything should work the same.
          </Text>

          <Text color={'gray.500'}>
            Everything else is up to you. We recommend using web3-react, but
            it's not required.
          </Text>

          <Text color={'gray.500'}>
            You can get Görli ether{' '}
            <Link
              href="https://faucet.paradigm.xyz/"
              isExternal
              color="purple.500"
            >
              here <ExternalLinkIcon mx="2px" />
            </Link>
            .
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default About
