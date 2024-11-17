import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { useI18n, useUser } from '@/hooks';

import { AssetByVariant, IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import GlobalFeed from '@/components/organisms/GlobalFeed/GlobalFeed';

import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from '@/components/atoms/button';


function Example({ navigation }: RootScreenProps<Paths.Example>) {
  const { t } = useTranslation();
  const { useFetchOneQuery } = useUser();
  const { toggleLanguage } = useI18n();

  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const fetchOneUserQuery = useFetchOneQuery(currentId);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(
        t('screen_example.hello_user', { name: fetchOneUserQuery.data.name }),
      );
    }
  }, [fetchOneUserQuery.isSuccess, fetchOneUserQuery.data, t]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const goToCards = () => {
    navigation.navigate(Paths.CardsScreen)
  }

  const goToInventory = () => {
    navigation.navigate(Paths.Inventory)
  }

  const goToCreate = () => {
    navigation.navigate(Paths.CreateItem)
  }

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={fetchOneUserQuery.refetch}
    >
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path={'tom'}
              resizeMode={'contain'}
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            {/* <Button size="md" variant="solid" action="primary" onPress={goToCards}>
              <ButtonText>Go To Cards</ButtonText>
            </Button> */}
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              Objectify
              {/* {t('screen_example.title')} */}
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              Landing screen for the app, where you can then navigate to the desired 
              functionalities by pressing buttons
              {/* {t('screen_example.description')} */}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <Skeleton
              height={64}
              loading={fetchOneUserQuery.isLoading}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                onPress={goToCards}
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID="fetch-user-button"
              >
                <IconByVariant path={'send'} stroke={colors.purple500} />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              onPress={goToCreate}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path={'theme'} stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={goToInventory}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant path={'language'} stroke={colors.purple500} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
