import { Box, Flex, StatGroup } from '@chakra-ui/react'
import StatBox from '../UI/StatBox'
import Content_Org from './Content_Org'
import Content_repo from './Content_repo'
const content = ({activeRepoNumber , repo}) => {
  return (
    < >
        {
            activeRepoNumber === null ? (
                <Content_Org /> 
            ) : (
                    <Content_repo activeRepoNumber={activeRepoNumber} repo={repo}/>
                )
        }
    </>
  )
}

export default content
