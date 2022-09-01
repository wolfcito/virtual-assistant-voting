import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import VotingContent from '../../config/web3/artifacts/VotingContent'

const { address, abi } = VotingContent

const useHandleContract = () => {
  const { active, library, chainId } = useWeb3React()

  return useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId])
    // eslint-disable-next-line
  }, [active, chainId, library?.eth?.Contract])
}

export default useHandleContract
