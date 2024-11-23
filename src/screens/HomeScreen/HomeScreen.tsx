import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

function HomeScreen({ navigation }: RootScreenProps<Paths.HomeScreen>) {
  const { colors, layout, gutters, fonts, components, backgrounds } = useTheme();

  const navigateTo = (path: Paths) => {
    navigation.navigate(path);
  };

  return (
    <SafeScreen style={[backgrounds.skeleton]}>
      <ScrollView contentContainerStyle={[layout.fullSize, layout.itemsCenter]}>
        {/* Header Section */}
        <View style={[layout.fullWidth, gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <Text style={[fonts.size_36, fonts.bold, fonts.gray800]}>Welcome</Text>
          <Text style={[fonts.size_16, fonts.gray400, gutters.marginTop_8]}>
            Start exploring your app features.
          </Text>
        </View>

        {/* Grid Buttons */}
        <View
          style={[
            layout.rowWrap,
            layout.justifyCenter,
            layout.fullWidth,
            gutters.marginTop_40,
            gutters.paddingHorizontal_16,
          ]}
        >
          {/* Navigation Button - Cards */}
          <TouchableOpacity
            onPress={() => navigateTo(Paths.CardsScreen)}
            style={[
              components.cardButton,
              gutters.margin_16,
              layout.itemsCenter,
              backgrounds.lightPurple,
            ]}
            testID="cards-button"
            accessible={true}
            accessibilityLabel="Navigate to Cards"
          >
            <IconByVariant
              path={'send'}
              stroke={colors.purple500}
              style={{ marginBottom: 12 }}
            />
            <Text style={[fonts.size_16, fonts.skeleton]}>Cards</Text>
          </TouchableOpacity>

          {/* Navigation Button - Create */}
          <TouchableOpacity
            onPress={() => navigateTo(Paths.CreateItem)}
            style={[
              components.cardButton,
              gutters.margin_16,
              layout.itemsCenter,
              backgrounds.lightPurple,
            ]}
            testID="create-button"
            accessible={true}
            accessibilityLabel="Navigate to Create Item"
          >
            <IconByVariant
              path={'theme'}
              stroke={colors.purple500}
              style={{ marginBottom: 12 }}
            />
            <Text style={[fonts.size_16, fonts.skeleton]}>Create</Text>
          </TouchableOpacity>

          {/* Navigation Button - Inventory */}
          <TouchableOpacity
            onPress={() => navigateTo(Paths.Inventory)}
            style={[
              components.cardButton,
              gutters.margin_16,
              layout.itemsCenter,
              backgrounds.lightPurple,
            ]}
            testID="inventory-button"
            accessible={true}
            accessibilityLabel="Navigate to Inventory"
          >
            <IconByVariant
              path={'language'}
              stroke={colors.purple500}
              style={{ marginBottom: 12 }}
            />
            <Text style={[fonts.size_16, fonts.skeleton]}>Inventory</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View
          style={[
            layout.fullWidth,
            layout.itemsCenter,
            gutters.marginTop_80,
            gutters.marginBottom_40,
          ]}
        >
          <Text style={[fonts.size_14, fonts.gray400]}>Objectify: Work in Progress</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default HomeScreen;
