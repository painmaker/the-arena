interface ShopAbility {
  name: string,
  aliases: { [key: number]: string },
  requiredLevel: number,
};

interface ShopAbilities {
  RegularAbilities: ShopAbility[],
  UltimateAbilities: ShopAbility[],
}
