PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_subscribe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`preferred_format` text DEFAULT 'pdf' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_subscribe`("id", "email", "source", "preferred_format") SELECT "id", "email", "source", "preferred_format" FROM `subscribe`;--> statement-breakpoint
DROP TABLE `subscribe`;--> statement-breakpoint
ALTER TABLE `__new_subscribe` RENAME TO `subscribe`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `subscribe_email_unique` ON `subscribe` (`email`);