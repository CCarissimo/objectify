import 'react-native-gesture-handler';

import "../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';

import "websocket-polyfill";

import '@/translations';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const storage = new MMKV();


function App() {
  return (
      <GluestackUIProvider mode="light">
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider storage={storage}>
                <ApplicationNavigator />
            </ThemeProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </GluestackUIProvider>
    
  );
}

export default App;
