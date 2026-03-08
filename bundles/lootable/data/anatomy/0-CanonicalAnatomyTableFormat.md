# Below is the template needed

```Yaml
# bundles/lootable/data/anatomy/<physiology>.yml
---
anatomy:
  harvest:
    - id: <item>
      name: <display name>
      base: <base quantity>
      chance: <0–1>
  skin:
    - id: <item>
      name: <display name>
      base: <base quantity>
      chance: <0–1>
  butcher:
    - id: <item>
      name: <display name>
      base: <base quantity>
      chance: <0–1>

  subtype:
    <subtype_name>:
      harvest: [...]
      skin: [...]
      butcher: [...]

  sizeMultiplier:
    tiny: 0.5
    small: 1
    medium: 1.5
    large: 2
    huge: 3
    gargantuan: 4
```
