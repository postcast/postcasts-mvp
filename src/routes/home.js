import React, { Component } from 'react'
import styled from 'react-emotion'

import Navigation from '../components/navigation'

import LoadForm from '../components/load-form'
import ReactIcon from '../components/icons/react'
import ReduxIcon from '../components/icons/redux'
import VSCodeIcon from '../components/icons/vscode'
import Postcast from '../components/postcast'

const encode = (url) => btoa(url)
const decode = (encoded) => atob(encoded)

export default class Home extends Component {

  constructor(props){
    super(props)
    const { match } = props
    this.state = {
      src: match ? decode(props.match.params.encoded) : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props

    if ( match !== nextProps.match ) {
      this.setState({
        src: nextProps.match ? decode(nextProps.match.params.encoded) : ''
      })
    }
  }

  handleHomeNav = () => {
    const { history } = this.props
    history.push(`/`)
  }
  
  handleSourceSelection = (src) => {
    const { history } = this.props
    history.push(`/play/${encode(src)}`)
  }

  loadReact = () => {    
    this.handleSourceSelection('https://raw.githubusercontent.com/facebook/react/master/README.md')
  }

  loadRedux = () => {
    this.handleSourceSelection('https://raw.githubusercontent.com/reactjs/redux/master/README.md')
  }

  loadVSCode = () => {
    this.handleSourceSelection('https://raw.githubusercontent.com/Microsoft/vscode/master/README.md')
  }


  render() {
    const { src } = this.state
    return (
      <div>
        <Navigation onNavHome={this.handleHomeNav}/>
        <Main hasSrc={!!src}>
          <LoadForm onSelected={this.handleSourceSelection} src={src}/>
          <Message>Or try these README.md from github</Message>
          <Links>
            <ReactIcon onClick={this.loadReact} height="40" width="40" />
            <ReduxIcon onClick={this.loadRedux} height="40" width="40" />
            <VSCodeIcon onClick={this.loadVSCode} height="40" width="40" />
          </Links>
          <Section>
            <Postcast src={src}/>
          </Section>
        </Main>
      </div>
    )
  }
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  padding: ${({hasSrc}) => hasSrc ? '0 50px 0px': '50px 50px 0' };
  transition: all .3s ease;
`

const Links = styled.div`
  display: flex;
  align-items: center;
`

const Message = styled.div`
  font-size: 14px;
  margin: 10px;
  font-weight: 100;

`
const Section = styled.div`
  padding: 30px 0;
`