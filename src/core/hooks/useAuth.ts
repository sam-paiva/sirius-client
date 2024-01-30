import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function useAuth() {
  const authenticated = useSelector<RootState, boolean>((c) => c.users.isAuthenticated);

  return authenticated;
}
