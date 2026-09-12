import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { roleForEmail } from "../../../config/access";
import { tabsForRole } from "../../../config/navigation";
import { useAuth } from "@/lib/auth-context";

type TabRoute = "dashboard" | "pets" | "triagens" | "care" | "queue" | "alertas" | "clinic";
type IconName = "home" | "pets" | "health-and-safety" | "event-note" | "format-list-bulleted" | "notifications-none" | "business";

const allRoutes: TabRoute[] = ["dashboard", "pets", "triagens", "care", "queue", "alertas", "clinic"];

const iconByRoute: Record<TabRoute, IconName> = {
  dashboard: "home",
  pets: "pets",
  triagens: "health-and-safety",
  care: "event-note",
  queue: "format-list-bulleted",
  alertas: "notifications-none",
  clinic: "business",
};

const titleByRoute: Record<TabRoute, string> = {
  dashboard: "Início",
  pets: "Meus pets",
  triagens: "Triagens",
  care: "Plano",
  queue: "Fila de atenção",
  alertas: "Alertas",
  clinic: "Minha clínica",
};

export default function TabsLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const allowedRoutes = new Set(tabsForRole(roleForEmail(user?.email, user?.tipo)).map((tab) => tab.route));
  const bottomPadding = Platform.OS === "web" ? 9 : Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700", marginBottom: 2 },
        tabBarStyle: {
          height: 66 + bottomPadding,
          paddingTop: 8,
          paddingBottom: bottomPadding,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          elevation: 12,
          shadowColor: "#12352C",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
      }}
    >
      {allRoutes.map((route) => {
        const visible = allowedRoutes.has(route);
        return (
          <Tabs.Screen
            key={route}
            name={route}
            options={{
              title: titleByRoute[route],
              href: visible ? undefined : null,
              tabBarIcon: ({ color }) => <IconSymbol name={iconByRoute[route]} size={23} color={color} />,
            }}
          />
        );
      })}
      <Tabs.Screen name="perfil" options={{ href: null }} />
    </Tabs>
  );
}
