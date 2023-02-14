import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import Home from './pages/Home';
import Protocols from './pages/Protocols';
import ProtocolDetails from './pages/ProtocolDetails';
import UnlistedCreate from './pages/UnlistedCreate';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Claims from './pages/Claims';
import Governance from './pages/Governance';

function App() {
  return (
    <Router>
      <Flex>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/protocols" element={<Protocols />} />
            <Route path="/protocols/:id" element={<ProtocolDetails />} />
            <Route path="/create-custom-insurance" element={<UnlistedCreate />} />
            <Route path="/risk-assessor-dashboard" element={<Dashboard />} />
            <Route path="/governance-proposals" element={<Proposals />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/governance" element={<Governance />} />
          </Routes>
        </Flex>
    </Router>
  );
}

export default App;
