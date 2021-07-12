import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons"
import ProfileConnectionsBoxWrapper from "../src/components/ProfileConnections"

const ProfileSideBar = (props) => {
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style= {{borderRadius: '50%'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'vickyad'
  const favoritePeople = ['prphawk', 'JPedroSilveira', 'AndrewLBorges', 'petcomputacaoufrgs', 'LeoHernandes', 'bbeneduzib']

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="connectionsArea" style={{gridArea: 'connectionsArea'}}>
          <ProfileConnectionsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((person) => {
                return (
                  <li>
                    <a href={`/users/${person}`} key={person}>
                      <img src={`https://github.com/${person}.png`}/>
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileConnectionsBoxWrapper>
          <Box>
            Comunidade
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
