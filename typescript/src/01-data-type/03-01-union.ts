// ==================== union ====================
let unionF1: string | number = "Str";
unionF1 = 1;
// unionF1 = true

let unionF2: string | null | undefined = "Str";
unionF2 = null;
unionF2 = undefined;
// unionF2 = 1

let unionF3: "A" | 1 | null = "A";
unionF3 = 1;
unionF3 = null;
// unionF3 = "B"

export {}