import data from "./day3-data";

// Get priority rating of item
function getPriority(item: string): number {
  const charCode: number = item.charCodeAt(0);
  const priority: number = charCode < 91 ? charCode - 38 : charCode - 96;

  return priority;
}

/* ***************** PART 1 ****************** */

// Find duplicate item in compartments
function findDuplicateItems(compartments: string[]): string[] {
  const compartment_1: string[] = compartments[0].split("");
  const compartment_2: string[] = compartments[1].split("");

  const set_1: Set<string> = new Set();
  compartment_1.forEach((item) => set_1.add(item));

  const duplicate: string[] = compartment_2.filter((item) => set_1.has(item));

  return duplicate;
}

// Main Function
function findSumPriorities(rucksacks: string[]): number {
  let sum: number = 0;

  rucksacks.forEach((rucksack) => {
    const item_count: number = rucksack.length;
    const rucksack_pivot: number = item_count / 2;
    const compartment_1: string = rucksack.slice(0, rucksack_pivot);
    const compartment_2: string = rucksack.slice(rucksack_pivot);

    const duplicateItem: string[] = findDuplicateItems([
      compartment_1,
      compartment_2
    ]);
    const priority: number = getPriority(duplicateItem[0]);
    sum += priority;
  });

  console.log("ANSWER:", sum);
  return sum;
}

/* ***************** PART 2 ****************** */

// Find duplicate item in groups
function findDuplicateSet(compartments: string[]): Set<string> {
  const compartment_1: string[] = compartments[0].split("");
  const compartment_2: string[] = compartments[1].split("");

  const set_1: Set<string> = new Set();
  compartment_1.forEach((item) => set_1.add(item));

  const duplicates: Set<string> = new Set();
  compartment_2.forEach((item) => {
    if (set_1.has(item)) duplicates.add(item);
  });

  return duplicates;
}

// Find Duplucate Badge from dupplicate items
function findDuplicateBadge(group: string[]): string {
  const rucksack_0: string = group[0];
  const rucksack_1: string = group[1];
  const rucksack_2: string[] = group[2].split("");

  const first_set: string[] = [rucksack_0, rucksack_1];

  const duplicates = findDuplicateSet(first_set);
  const badge: string[] = rucksack_2.filter((item) => duplicates.has(item));
  return badge[0];
}

// DAY 3 PART 2 -- Find sum of badges
function findSumBadges(rucksacks: string[]): number {
  let sum: number = 0;

  for (let i = 0; i + 2 < rucksacks.length; i += 3) {
    const group: string[] = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];
    const badge: string = findDuplicateBadge(group);

    const priority: number = getPriority(badge);

    sum += priority;
  }

  console.log("ANSWER!", sum);
  return sum;
}

findSumBadges(data);
// findSumPriorities(data);
