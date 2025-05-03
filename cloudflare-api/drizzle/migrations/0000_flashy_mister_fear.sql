CREATE TABLE `subscribe` (
	`email` text NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`interests` text DEFAULT '[]' NOT NULL,
	`preferred_format` text DEFAULT 'pdf' NOT NULL
);
