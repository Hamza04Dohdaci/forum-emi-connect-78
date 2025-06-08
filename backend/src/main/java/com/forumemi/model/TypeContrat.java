
package com.forumemi.model;

public enum TypeContrat {
    SILVER("Silver", 5000.0),
    GOLD("Gold", 15000.0),
    DIAMOND("Diamond", 30000.0);

    private final String displayName;
    private final double montantBase;

    TypeContrat(String displayName, double montantBase) {
        this.displayName = displayName;
        this.montantBase = montantBase;
    }

    public String getDisplayName() { return displayName; }
    public double getMontantBase() { return montantBase; }
}
