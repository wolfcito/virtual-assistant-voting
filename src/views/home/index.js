import React, { useCallback, useEffect, useState } from 'react'
import {
  Stack,
  Flex,
  Heading,
  Text,
  Image,
  Badge,
  useToast,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import useHandleContract from '../../hooks/useHandleContract'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

import BarChart from '../../components/charts/barchart'
import Voted from '../../components/voted'
import NoVoted from '../../components/no-voted'
import RequestAccess from '../../components/request-access'

const Home = () => {
  const [imageSrc, setImageSrc] = useState('')
  const { active, account } = useWeb3React()
  const virtualitoNFTs = useHandleContract()

  const [numberVotesYes, setNumberVotesYes] = useState(0)
  const [numberVotesNO, setNumberVotesNO] = useState(0)
  const [valueFEE, setvalueFEE] = useState(0)
  const [valueFEEWithOutConvertion, setvalueFEEWithOutConvertion] = useState(0)

  const [voted, setVvoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  const [messageVoteFee, setmessageVoteFee] = useState('')
  const [radioOption, setRadioOption] = React.useState('3')

  const toast = useToast()

  const getVotingData = useCallback(async () => {
    if (virtualitoNFTs) {
      const numberOfVotesForYes = await virtualitoNFTs.methods
        .votesForYes()
        .call()

      const numberOfVotesForNo = await virtualitoNFTs.methods
        .votesForNo()
        .call()

      const valueVoteAcc = await virtualitoNFTs.methods.getVote(account).call()

      const valueVoteFee = await virtualitoNFTs.methods.VOTE_FEE().call()

      setNumberVotesYes(numberOfVotesForYes)
      setNumberVotesNO(numberOfVotesForNo)

      statusVote(valueVoteAcc)

      setvalueFEEWithOutConvertion(valueVoteFee)
      setvalueFEE(valueVoteFee / Math.pow(10, 18))
      setmessageVoteFee(`${valueFEE} ETH`)
    } else {
      statusVote(undefined)
    }
  }, [virtualitoNFTs, account, valueFEE])

  const statusVote = (value) => {
    // eslint-disable-next-line
    if (value == 0) {
      setVvoted(false)
      setImageSrc(
        'https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/bubble-icon.png',
      )
      return 'You have yet to vote'
    }

    if (value > 0) {
      setVvoted(true)
      setImageSrc(
        'https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/shield-ok-icon.png',
      )
      return 'Congratulations you have already voted'
    }

    if (value === undefined) {
      setImageSrc(
        'https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/shield-warning-icon.png',
      )
      setVvoted(false)
      return ''
    }
  }

  useEffect(() => {
    getVotingData()
  }, [getVotingData])

  const keepVote = () => {
    setIsVoting(true)

    // Web3.utils.toWei(valueFEE)

    if (radioOption === '1' || radioOption === '2') {
      virtualitoNFTs.methods
        .vote(Number(radioOption))
        .send({
          from: account,
          value: Web3.utils.toWei(valueFEEWithOutConvertion, 'wei'),
        })
        .on('transactionHash', (txHash) => {
          toast({
            title: 'Su Voto ha sido enviado',
            description: txHash,
            status: 'info',
          })
        })
        .on('receipt', () => {
          setIsVoting(false)
          toast({
            title: 'Voto confirmado',
            description: 'Su voto fue exitoso.',
            status: 'success',
          })
        })
        .on('error', (error) => {
          setIsVoting(false)
          toast({
            title: 'Votación fallida',
            description: error.message,
            status: 'error',
          })
        })
      getVotingData()
    } else {
      setIsVoting(false)
      toast({
        title: 'Invalid option',
        description: 'Valid options are: Yes or NO',
        status: 'info',
      })
    }
  }

  const ValidVoted = () => {
    if (voted) {
      return <Voted imageSrc={imageSrc} />
    } else {
      return (
        <>
          <NoVoted
            imageSrc={imageSrc}
            voteFee={messageVoteFee}
            virtualitoNFTs={virtualitoNFTs}
            isVoting={isVoting}
            keepVote={keepVote}
          >
            <RadioGroup onChange={setRadioOption} value={radioOption}>
              <Stack direction="column">
                <Radio value="3">I haven't decided yet</Radio>
                <Radio value="1">Vote for YES</Radio>
                <Radio value="2">Vote for NO</Radio>
              </Stack>
            </RadioGroup>
          </NoVoted>
        </>
      )
    }
  }

  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 10, md: 18 }}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Flex
        flex={1}
        direction="column"
        justify={'center'}
        align={'center'}
        position={'relative'}
        w={'full'}
      >
        {active ? (
          <ValidVoted />
        ) : (
          <>
            <Text color={'gray.500'}>
              - Remind this transaction have a cost {messageVoteFee}.
              <br />
              - It work in Görli and with MetaMask
              <br />
            </Text>
            <Image src={imageSrc} width={150} />
            <Badge mt={2}>Wallet disconnected</Badge>
          </>
        )}
      </Flex>
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
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
            Results of Voting
          </Text>
        </Heading>
        {active ? (
          <>
            <BarChart votesNO={numberVotesNO} votesYES={numberVotesYes} />
          </>
        ) : (
          <RequestAccess />
        )}
      </Stack>
    </Stack>
  )
}

export default Home
