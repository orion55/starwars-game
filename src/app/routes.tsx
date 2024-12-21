import { Route, Routes } from 'react-router';
import { HomePage } from '@/pages/HomePage';
import { Character } from '@/pages/Character';

export const RoutePaths = {
  Home: '/',
  Character: '/character',
  CharacterEdit: '/character/:id',
} as const;

function AppRoutes() {
  return (
    <Routes>
      <Route path={RoutePaths.Home} element={<HomePage />} />
      <Route path={RoutePaths.Character} element={<Character />} />
      <Route path={RoutePaths.CharacterEdit} element={<Character />} />
    </Routes>
  );
}

export default AppRoutes;
