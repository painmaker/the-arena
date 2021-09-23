interface ShopAbility {
  name: string,
  aliases: { [key: number]: string },
  requiredLevel: number,
};

interface ShopAbilities {
  regularAbilities: ShopAbility[],
  ultimateAbilities: ShopAbility[],
}
