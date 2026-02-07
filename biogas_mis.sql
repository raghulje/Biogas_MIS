-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: biogas_mis
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `resource_type` varchar(255) DEFAULT NULL,
  `resource_id` varchar(255) DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_logs_created_at` (`created_at`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,1,'CREATE_MIS_ENTRY','MISDailyEntry','1',NULL,'{\"id\": 1, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T04:50:00.411Z\", \"updatedAt\": \"2026-02-07T04:50:00.411Z\", \"created_by\": 1, \"review_comment\": \"Integration test entry\"}','::1','node','2026-02-07 04:50:00','2026-02-07 04:50:00'),(2,1,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": null, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"manpower\": null, \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"digesters\": [{\"id\": 1, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": null, \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"utilities\": null, \"created_by\": 1, \"fertilizer\": null, \"slsMachine\": null, \"compressors\": null, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"audit_note\": null, \"cow_dung_stock\": 50, \"press_mud_used\": 0, \"cow_dung_purchased\": 100, \"total_press_mud_stock\": 0, \"new_press_mud_purchased\": 0, \"old_press_mud_purchased\": 0, \"old_press_mud_closing_stock\": 0, \"old_press_mud_opening_balance\": 0, \"old_press_mud_degradation_loss\": 0}, \"feedMixingTank\": null, \"review_comment\": \"Integration test entry\", \"compressedBiogas\": null, \"rawBiogasQuality\": null, \"plantAvailability\": null}',NULL,'::1','node','2026-02-07 04:50:00','2026-02-07 04:50:00'),(3,1,'CREATE_USER','User','4',NULL,'{\"name\": \"Raghul\", \"email\": \"raghul.je@refex.co.in\", \"role_id\": 1}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:02:49','2026-02-07 05:02:49'),(4,1,'CREATE_USER','User','5',NULL,'{\"name\": \"Murugesh\", \"email\": \"murugesh.k@refex.co.in\", \"role_id\": 1}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:05:06','2026-02-07 05:05:06'),(5,1,'DEACTIVATE_USER','User','3','{\"id\": 3, \"name\": \"Jane Manager\", \"email\": \"manager@biogas.com\", \"role_id\": 2, \"password\": \"$2b$10$PWhHka5OXZaYJSRJQqgEW.SXeh7Le1jWIZlltwfTB/0Izi9eE0AYS\", \"createdAt\": \"2026-02-07T04:43:02.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-07T04:43:02.000Z\"}','{\"is_active\": false}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:07:24','2026-02-07 05:07:24'),(6,1,'DEACTIVATE_USER','User','2','{\"id\": 2, \"name\": \"John Operator\", \"email\": \"operator@biogas.com\", \"role_id\": 3, \"password\": \"$2b$10$G8x.GwxdNxr4Ebs2AbeQNOI4/W2bEKSqgBvwCclhiUtEEYpuYUHmW\", \"createdAt\": \"2026-02-07T04:43:02.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-07T04:43:02.000Z\"}','{\"is_active\": false}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:07:27','2026-02-07 05:07:27'),(7,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:08:26','2026-02-07 05:08:26'),(8,1,'UPDATE_USER','User','4','{\"id\": 4, \"name\": \"Raghul\", \"email\": \"raghul.je@refex.co.in\", \"role_id\": 1, \"password\": \"$2b$10$GmEet3rXj/icv4ZXHHbOPeq5cuDqC9YuOOoVr0ae4Nu/Mfac4Te6G\", \"createdAt\": \"2026-02-07T05:02:49.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-07T05:02:49.000Z\"}','{\"name\": \"Raghul\", \"email\": \"raghul.je@refex.co.in\", \"role_id\": 1}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:08:44','2026-02-07 05:08:44'),(9,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:09:12','2026-02-07 05:09:12'),(10,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:19','2026-02-07 05:13:19'),(11,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:26','2026-02-07 05:13:26'),(12,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 11, 12, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:37','2026-02-07 05:13:37'),(13,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 11, 12, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:51','2026-02-07 05:13:51'),(14,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:14:25','2026-02-07 05:14:25'),(15,4,'UPDATE_SMTP_CONFIG','SMTPConfig','1',NULL,'{\"host\": \"smtp.gmail.com\", \"port\": 587, \"secure\": true, \"auth_pass\": \"upkm vblu wdla pexq\", \"auth_user\": \"tech@helpdesksupport.co.in\", \"from_name\": \"SREL\", \"from_email\": \"tech@helpdesksupport.co.in\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:25:47','2026-02-07 05:25:47'),(16,4,'CREATE_MIS_ENTRY','MISDailyEntry','6',NULL,'{\"id\": 6, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:21:41.074Z\", \"updatedAt\": \"2026-02-07T07:21:41.074Z\", \"created_by\": 4, \"review_comment\": null}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 07:21:41','2026-02-07 07:21:41'),(17,4,'SUBMIT_ENTRY','MISDailyEntry','6',NULL,'{\"status\": \"submitted\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 07:21:41','2026-02-07 07:21:41'),(18,4,'DELETE_MIS_ENTRY','MISDailyEntry','6','{\"id\": 6, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:21:41.000Z\", \"updatedAt\": \"2026-02-07T07:21:41.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 13:05:52','2026-02-07 13:05:52'),(19,4,'DELETE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"created_by\": 1, \"review_comment\": \"Updated integration test entry\"}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 13:05:57','2026-02-07 13:05:57'),(20,4,'CREATE_MIS_ENTRY','MISDailyEntry','39',NULL,'{\"id\": 39, \"date\": \"2026-02-20\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T17:00:47.476Z\", \"updatedAt\": \"2026-02-07T17:00:47.476Z\", \"created_by\": 4, \"review_comment\": null}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 17:00:47','2026-02-07 17:00:47'),(21,4,'SUBMIT_ENTRY','MISDailyEntry','39',NULL,'{\"status\": \"submitted\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 17:00:48','2026-02-07 17:00:48');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_logs`
--

DROP TABLE IF EXISTS `email_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipient` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `status` enum('sent','failed') DEFAULT 'sent',
  `error_message` text,
  `sent_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_logs`
--

LOCK TABLES `email_logs` WRITE;
/*!40000 ALTER TABLE `email_logs` DISABLE KEYS */;
INSERT INTO `email_logs` VALUES (1,'admin@biogas.com','MIS Entry Submitted - 2026-02-10','sent',NULL,'2026-02-07 07:21:45'),(2,'raghul.je@refex.co.in','MIS Entry Submitted - 2026-02-10','sent',NULL,'2026-02-07 07:21:48'),(3,'murugesh.k@refex.co.in','MIS Entry Submitted - 2026-02-10','sent',NULL,'2026-02-07 07:21:51'),(4,'raghul.je@refex.co.in','SREL CBG Plant – Consolidated MIS Report for {{report_period}} (Test: 2026-01-07 to 2026-02-07)','sent',NULL,'2026-02-07 13:23:55'),(5,'raghul.je@refex.co.in','SREL CBG Plant – Consolidated MIS Report for {{report_period}} (Test: 2026-01-07 to 2026-02-07)','sent',NULL,'2026-02-07 13:57:26'),(6,'raghul.je@refex.co.in','SREL CBG Plant – Consolidated MIS Report (Test: 2026-01-07 to 2026-02-07)','sent',NULL,'2026-02-07 14:15:51'),(7,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-07 14:17:04'),(8,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-07 14:24:06'),(9,'murugesh.k@refex.co.in','MIS Entry Submitted - 2026-02-20','sent',NULL,'2026-02-07 17:00:54');
/*!40000 ALTER TABLE `email_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_scheduler`
--

DROP TABLE IF EXISTS `email_scheduler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_scheduler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `trigger_time` time DEFAULT NULL,
  `template_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `template_id` (`template_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `email_scheduler_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `email_scheduler_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_scheduler`
--

LOCK TABLES `email_scheduler` WRITE;
/*!40000 ALTER TABLE `email_scheduler` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_scheduler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_schedulers`
--

DROP TABLE IF EXISTS `email_schedulers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_schedulers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cron_expression` varchar(255) NOT NULL DEFAULT '0 9 * * *',
  `is_active` tinyint(1) DEFAULT '1',
  `job_type` enum('daily_reminder','status_check','report') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_schedulers`
--

LOCK TABLES `email_schedulers` WRITE;
/*!40000 ALTER TABLE `email_schedulers` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_schedulers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_templates`
--

DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` text NOT NULL COMMENT 'Supports variables {{user_name}}, {{entry_date}}, etc.',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_templates`
--

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `final_mis_report_config`
--

DROP TABLE IF EXISTS `final_mis_report_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `final_mis_report_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `to_emails` text NOT NULL,
  `subject` varchar(255) NOT NULL DEFAULT 'Final MIS Report',
  `body` text COMMENT 'Optional HTML body intro before the report table',
  `schedule_type` enum('daily','weekly','monthly','quarterly','custom') NOT NULL DEFAULT 'monthly',
  `schedule_time` varchar(10) DEFAULT '09:00' COMMENT 'Time of day HH:MM (24h) for daily/weekly/monthly/quarterly',
  `cron_expression` varchar(64) DEFAULT NULL COMMENT 'For schedule_type=custom, e.g. 0 9 * * 1 for Monday 9 AM',
  `is_active` tinyint(1) DEFAULT '1',
  `last_sent_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `final_mis_report_config`
--

LOCK TABLES `final_mis_report_config` WRITE;
/*!40000 ALTER TABLE `final_mis_report_config` DISABLE KEYS */;
INSERT INTO `final_mis_report_config` VALUES (1,'[\"raghul.je@refex.co.in\"]','SREL CBG Plant – Consolidated MIS Report','<p>\nPlease find attached the <strong>SREL CBG Plant MIS Report</strong> for the period:\n<strong>{{from_date}} to {{to_date}}</strong>.\n</p>\n\n<p>\nPlant: SREL CBG Facility<br/>\nReport Generated On: {{generated_datetime}}\n</p>','monthly','09:00',NULL,0,'2026-02-07 14:24:06','2026-02-07 13:23:47','2026-02-07 14:24:06');
/*!40000 ALTER TABLE `final_mis_report_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_logs`
--

DROP TABLE IF EXISTS `import_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `status` enum('success','failed','partial') NOT NULL,
  `records_processed` int DEFAULT NULL,
  `records_failed` int DEFAULT NULL,
  `error_log` json DEFAULT NULL,
  `imported_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `imported_by` (`imported_by`),
  CONSTRAINT `import_logs_ibfk_1` FOREIGN KEY (`imported_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_logs`
--

LOCK TABLES `import_logs` WRITE;
/*!40000 ALTER TABLE `import_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_biogas_data`
--

DROP TABLE IF EXISTS `mis_biogas_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_biogas_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `parameter` varchar(255) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `remarks` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `mis_biogas_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_biogas_data`
--

LOCK TABLES `mis_biogas_data` WRITE;
/*!40000 ALTER TABLE `mis_biogas_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `mis_biogas_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_compressed_biogas`
--

DROP TABLE IF EXISTS `mis_compressed_biogas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_compressed_biogas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `produced` float DEFAULT NULL,
  `ch4` float DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `h2s` float DEFAULT NULL,
  `o2` float DEFAULT NULL,
  `n2` float DEFAULT NULL,
  `conversion_ratio` float DEFAULT NULL,
  `ch4_slippage` float DEFAULT NULL,
  `cbg_stock` float DEFAULT NULL,
  `cbg_sold` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_compressed_biogas_entry_id` (`entry_id`),
  CONSTRAINT `mis_compressed_biogas_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_compressed_biogas`
--

LOCK TABLES `mis_compressed_biogas` WRITE;
/*!40000 ALTER TABLE `mis_compressed_biogas` DISABLE KEYS */;
INSERT INTO `mis_compressed_biogas` VALUES (1,6,0,0,0,0,0,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,782,92,2,5,0.2,0.8,0.77,2.5,110.4,662.4,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,841.5,92,2,5,0.2,0.8,0.78,2.5,118.8,712.8,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,901,92,2,5,0.2,0.8,0.79,2.5,127.2,763.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,960.5,92,2,5,0.2,0.8,0.79,2.5,135.6,813.6,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,756.5,92,2,5,0.2,0.8,0.77,2.5,106.8,640.8,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,816,92,2,5,0.2,0.8,0.78,2.5,115.2,691.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,875.5,92,2,5,0.2,0.8,0.78,2.5,123.6,741.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,935,92,2,5,0.2,0.8,0.79,2.5,132,792,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,731,92,2,5,0.2,0.8,0.77,2.5,103.2,619.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,790.5,92,2,5,0.2,0.8,0.77,2.5,111.6,669.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,850,92,2,5,0.2,0.8,0.78,2.5,120,720,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,909.5,92,2,5,0.2,0.8,0.79,2.5,128.4,770.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,969,92,2,5,0.2,0.8,0.79,2.5,136.8,820.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,765,92,2,5,0.2,0.8,0.77,2.5,108,648,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,824.5,92,2,5,0.2,0.8,0.78,2.5,116.4,698.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,884,92,2,5,0.2,0.8,0.78,2.5,124.8,748.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,943.5,92,2,5,0.2,0.8,0.79,2.5,133.2,799.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,739.5,92,2,5,0.2,0.8,0.77,2.5,104.4,626.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,799,92,2,5,0.2,0.8,0.77,2.5,112.8,676.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,858.5,92,2,5,0.2,0.8,0.78,2.5,121.2,727.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,918,92,2,5,0.2,0.8,0.79,2.5,129.6,777.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,977.5,92,2,5,0.2,0.8,0.8,2.5,138,828,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,773.5,92,2,5,0.2,0.8,0.77,2.5,109.2,655.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,833,92,2,5,0.2,0.8,0.78,2.5,117.6,705.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,892.5,92,2,5,0.2,0.8,0.79,2.5,126,756,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,952,92,2,5,0.2,0.8,0.79,2.5,134.4,806.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,748,92,2,5,0.2,0.8,0.77,2.5,105.6,633.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,807.5,92,2,5,0.2,0.8,0.77,2.5,114,684,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,867,92,2,5,0.2,0.8,0.78,2.5,122.4,734.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,926.5,92,2,5,0.2,0.8,0.79,2.5,130.8,784.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,722.5,92,2,5,0.2,0.8,0.76,2.5,102,612,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_compressed_biogas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_compressors`
--

DROP TABLE IF EXISTS `mis_compressors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_compressors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `compressor_1_hours` float DEFAULT NULL,
  `compressor_2_hours` float DEFAULT NULL,
  `total_hours` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `mis_compressors_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_compressors`
--

LOCK TABLES `mis_compressors` WRITE;
/*!40000 ALTER TABLE `mis_compressors` DISABLE KEYS */;
INSERT INTO `mis_compressors` VALUES (1,6,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,18.4,16.56,34.96,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,19.8,17.82,37.62,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,21.2,19.08,40.28,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,22.6,20.34,42.94,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,17.8,16.02,33.82,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,19.2,17.28,36.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,20.6,18.54,39.14,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,22,19.8,41.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,17.2,15.48,32.68,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,18.6,16.74,35.34,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,20,18,38,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,21.4,19.26,40.66,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,22.8,20.52,43.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,18,16.2,34.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,19.4,17.46,36.86,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,20.8,18.72,39.52,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,22.2,19.98,42.18,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,17.4,15.66,33.06,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,18.8,16.92,35.72,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,20.2,18.18,38.38,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,21.6,19.44,41.04,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,23,20.7,43.7,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,18.2,16.38,34.58,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,19.6,17.64,37.24,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,21,18.9,39.9,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,22.4,20.16,42.56,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,17.6,15.84,33.44,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,19,17.1,36.1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,20.4,18.36,38.76,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,21.8,19.62,41.42,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,17,15.3,32.3,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_compressors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_daily_entries`
--

DROP TABLE IF EXISTS `mis_daily_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_daily_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `shift` enum('Shift-1','Shift-2','General') DEFAULT 'General',
  `status` enum('draft','submitted','under_review','approved','rejected','deleted') DEFAULT 'draft',
  `review_comment` text,
  `created_by` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mis_daily_entries_date_shift` (`date`,`shift`),
  KEY `mis_daily_entries_date` (`date`),
  KEY `mis_daily_entries_status` (`status`),
  KEY `mis_daily_entries_created_by` (`created_by`),
  CONSTRAINT `mis_daily_entries_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_daily_entries`
--

LOCK TABLES `mis_daily_entries` WRITE;
/*!40000 ALTER TABLE `mis_daily_entries` DISABLE KEYS */;
INSERT INTO `mis_daily_entries` VALUES (1,'2026-02-07','General','deleted','Updated integration test entry',1,'2026-02-07 04:50:00','2026-02-07 13:05:57'),(6,'2026-02-10','General','deleted',NULL,4,'2026-02-07 07:21:41','2026-02-07 13:05:52'),(7,'2026-01-01','General','submitted',NULL,1,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(8,'2026-01-02','General','approved',NULL,1,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(9,'2026-01-03','General','submitted',NULL,1,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(10,'2026-01-04','General','approved',NULL,1,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(11,'2026-01-05','General','draft',NULL,1,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(12,'2026-01-06','General','submitted',NULL,1,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(13,'2026-01-07','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,'2026-01-08','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,'2026-01-09','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,'2026-01-10','General','draft',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,'2026-01-11','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,'2026-01-12','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,'2026-01-13','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,'2026-01-14','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,'2026-01-15','General','draft',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,'2026-01-16','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,'2026-01-17','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,'2026-01-18','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,'2026-01-19','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,'2026-01-20','General','draft',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,'2026-01-21','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,'2026-01-22','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,'2026-01-23','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,'2026-01-24','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,'2026-01-25','General','draft',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,'2026-01-26','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,'2026-01-27','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(34,'2026-01-28','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(35,'2026-01-29','General','approved',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(36,'2026-01-30','General','draft',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(37,'2026-01-31','General','submitted',NULL,1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(39,'2026-02-20','General','submitted',NULL,4,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_daily_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_digester_data`
--

DROP TABLE IF EXISTS `mis_digester_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_digester_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `digester_name` varchar(255) DEFAULT NULL,
  `feeding_slurry` float DEFAULT NULL,
  `feeding_ts_percent` float DEFAULT NULL,
  `feeding_vs_percent` float DEFAULT NULL,
  `discharge_slurry` float DEFAULT NULL,
  `discharge_ts_percent` float DEFAULT NULL,
  `discharge_vs_percent` float DEFAULT NULL,
  `temp` float DEFAULT NULL,
  `ph` float DEFAULT NULL,
  `pressure` float DEFAULT NULL,
  `lignin` float DEFAULT NULL,
  `vfa` float DEFAULT NULL,
  `alkalinity` float DEFAULT NULL,
  `vfa_alk_ratio` float DEFAULT NULL,
  `ash` float DEFAULT NULL,
  `density` float DEFAULT NULL,
  `slurry_level` float DEFAULT NULL,
  `agitator_runtime` int DEFAULT NULL,
  `agitator_condition` varchar(255) DEFAULT NULL,
  `hrt` float DEFAULT NULL,
  `vs_destruction` float DEFAULT NULL,
  `olr` float DEFAULT NULL,
  `balloon_level` float DEFAULT NULL,
  `foaming_level` float DEFAULT NULL,
  `remarks` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_digester_data_entry_id` (`entry_id`),
  CONSTRAINT `mis_digester_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_digester_data`
--

LOCK TABLES `mis_digester_data` WRITE;
/*!40000 ALTER TABLE `mis_digester_data` DISABLE KEYS */;
INSERT INTO `mis_digester_data` VALUES (2,1,'Digester 01',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,0,0,0,0,0,NULL,'2026-02-07 04:50:00','2026-02-07 04:50:00'),(3,6,'Digester 01',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,'OK',0,0,0,0,0,NULL,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(4,6,'Digester 02',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,'OK',0,0,0,0,0,NULL,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(5,6,'Digester 03',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,'OK',0,0,0,0,0,NULL,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(6,7,'Digester 01',9.2,8,64,8.74,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,69,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,7,'Digester 02',9.2,8,64,8.74,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,69,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(8,7,'Digester 03',9.2,8,64,8.74,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,69,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(9,8,'Digester 01',9.9,8,64,9.4,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,74.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(10,8,'Digester 02',9.9,8,64,9.4,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,74.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(11,8,'Digester 03',9.9,8,64,9.4,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,74.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(12,9,'Digester 01',10.6,8,64,10.07,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,79.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(13,9,'Digester 02',10.6,8,64,10.07,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,79.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(14,9,'Digester 03',10.6,8,64,10.07,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,79.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(15,10,'Digester 01',11.3,8,64,10.74,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,84.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(16,10,'Digester 02',11.3,8,64,10.74,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,84.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(17,10,'Digester 03',11.3,8,64,10.74,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,84.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(18,11,'Digester 01',8.9,8,64,8.46,8.2,62,38,7.2,1.01,12,2.5,4.2,0.6,18,1.02,66.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(19,11,'Digester 02',8.9,8,64,8.46,8.2,62,38,7.2,1.01,12,2.5,4.2,0.6,18,1.02,66.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(20,11,'Digester 03',8.9,8,64,8.46,8.2,62,38,7.2,1.01,12,2.5,4.2,0.6,18,1.02,66.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(21,12,'Digester 01',9.6,8,64,9.12,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,72,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(22,12,'Digester 02',9.6,8,64,9.12,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,72,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,12,'Digester 03',9.6,8,64,9.12,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,72,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,13,'Digester 01',10.3,8,64,9.79,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,77.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,13,'Digester 02',10.3,8,64,9.79,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,77.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,13,'Digester 03',10.3,8,64,9.79,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,77.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,14,'Digester 01',11,8,64,10.45,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,82.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,14,'Digester 02',11,8,64,10.45,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,82.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,14,'Digester 03',11,8,64,10.45,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,82.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,15,'Digester 01',8.6,8,64,8.17,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,64.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,15,'Digester 02',8.6,8,64,8.17,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,64.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,15,'Digester 03',8.6,8,64,8.17,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,64.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,16,'Digester 01',9.3,8,64,8.83,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,69.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(34,16,'Digester 02',9.3,8,64,8.83,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,69.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(35,16,'Digester 03',9.3,8,64,8.83,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,69.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(36,17,'Digester 01',10,8,64,9.5,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(37,17,'Digester 02',10,8,64,9.5,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(38,17,'Digester 03',10,8,64,9.5,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(39,18,'Digester 01',10.7,8,64,10.17,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,80.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(40,18,'Digester 02',10.7,8,64,10.17,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,80.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(41,18,'Digester 03',10.7,8,64,10.17,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,80.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(42,19,'Digester 01',11.4,8,64,10.83,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,85.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(43,19,'Digester 02',11.4,8,64,10.83,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,85.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(44,19,'Digester 03',11.4,8,64,10.83,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,85.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(45,20,'Digester 01',9,8,64,8.55,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,67.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(46,20,'Digester 02',9,8,64,8.55,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,67.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(47,20,'Digester 03',9,8,64,8.55,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,67.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(48,21,'Digester 01',9.7,8,64,9.22,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,72.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(49,21,'Digester 02',9.7,8,64,9.22,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,72.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(50,21,'Digester 03',9.7,8,64,9.22,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,72.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(51,22,'Digester 01',10.4,8,64,9.88,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,78,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(52,22,'Digester 02',10.4,8,64,9.88,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,78,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(53,22,'Digester 03',10.4,8,64,9.88,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,78,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(54,23,'Digester 01',11.1,8,64,10.55,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,83.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(55,23,'Digester 02',11.1,8,64,10.55,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,83.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(56,23,'Digester 03',11.1,8,64,10.55,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,83.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(57,24,'Digester 01',8.7,8,64,8.27,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,65.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(58,24,'Digester 02',8.7,8,64,8.27,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,65.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(59,24,'Digester 03',8.7,8,64,8.27,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,65.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(60,25,'Digester 01',9.4,8,64,8.93,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,70.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(61,25,'Digester 02',9.4,8,64,8.93,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,70.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(62,25,'Digester 03',9.4,8,64,8.93,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,70.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(63,26,'Digester 01',10.1,8,64,9.6,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,75.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(64,26,'Digester 02',10.1,8,64,9.6,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,75.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(65,26,'Digester 03',10.1,8,64,9.6,8.2,62,38,7.2,1.05,12,2.5,4.2,0.6,18,1.02,75.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(66,27,'Digester 01',10.8,8,64,10.26,8.2,62,38,7.2,1.08,12,2.5,4.2,0.6,18,1.02,81,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(67,27,'Digester 02',10.8,8,64,10.26,8.2,62,38,7.2,1.08,12,2.5,4.2,0.6,18,1.02,81,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(68,27,'Digester 03',10.8,8,64,10.26,8.2,62,38,7.2,1.08,12,2.5,4.2,0.6,18,1.02,81,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(69,28,'Digester 01',11.5,8,64,10.93,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,86.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(70,28,'Digester 02',11.5,8,64,10.93,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,86.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(71,28,'Digester 03',11.5,8,64,10.93,8.2,62,38,7.2,1.1,12,2.5,4.2,0.6,18,1.02,86.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(72,29,'Digester 01',9.1,8,64,8.65,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,68.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(73,29,'Digester 02',9.1,8,64,8.65,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,68.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(74,29,'Digester 03',9.1,8,64,8.65,8.2,62,38,7.2,1.02,12,2.5,4.2,0.6,18,1.02,68.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(75,30,'Digester 01',9.8,8,64,9.31,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,73.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(76,30,'Digester 02',9.8,8,64,9.31,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,73.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(77,30,'Digester 03',9.8,8,64,9.31,8.2,62,38,7.2,1.04,12,2.5,4.2,0.6,18,1.02,73.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(78,31,'Digester 01',10.5,8,64,9.98,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,78.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(79,31,'Digester 02',10.5,8,64,9.98,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,78.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(80,31,'Digester 03',10.5,8,64,9.98,8.2,62,38,7.2,1.07,12,2.5,4.2,0.6,18,1.02,78.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(81,32,'Digester 01',11.2,8,64,10.64,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,84,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(82,32,'Digester 02',11.2,8,64,10.64,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,84,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(83,32,'Digester 03',11.2,8,64,10.64,8.2,62,38,7.2,1.09,12,2.5,4.2,0.6,18,1.02,84,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(84,33,'Digester 01',8.8,8,64,8.36,8.2,62,38,7.2,1.01,12,2.5,4.2,0.6,18,1.02,66,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(85,33,'Digester 02',8.8,8,64,8.36,8.2,62,38,7.2,1.01,12,2.5,4.2,0.6,18,1.02,66,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(86,33,'Digester 03',8.8,8,64,8.36,8.2,62,38,7.2,1.01,12,2.5,4.2,0.6,18,1.02,66,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(87,34,'Digester 01',9.5,8,64,9.03,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,71.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(88,34,'Digester 02',9.5,8,64,9.03,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,71.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(89,34,'Digester 03',9.5,8,64,9.03,8.2,62,38,7.2,1.03,12,2.5,4.2,0.6,18,1.02,71.25,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(90,35,'Digester 01',10.2,8,64,9.69,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,76.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(91,35,'Digester 02',10.2,8,64,9.69,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,76.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(92,35,'Digester 03',10.2,8,64,9.69,8.2,62,38,7.2,1.06,12,2.5,4.2,0.6,18,1.02,76.5,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(93,36,'Digester 01',10.9,8,64,10.36,8.2,62,38,7.2,1.08,12,2.5,4.2,0.6,18,1.02,81.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(94,36,'Digester 02',10.9,8,64,10.36,8.2,62,38,7.2,1.08,12,2.5,4.2,0.6,18,1.02,81.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(95,36,'Digester 03',10.9,8,64,10.36,8.2,62,38,7.2,1.08,12,2.5,4.2,0.6,18,1.02,81.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(96,37,'Digester 01',8.5,8,64,8.07,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,63.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(97,37,'Digester 02',8.5,8,64,8.07,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,63.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(98,37,'Digester 03',8.5,8,64,8.07,8.2,62,38,7.2,1,12,2.5,4.2,0.6,18,1.02,63.75,NULL,'OK',28,72,2.5,80,0,NULL,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(99,39,'Digester 01',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,'OK',0,0,0,0,0,NULL,'2026-02-07 17:00:47','2026-02-07 17:00:47'),(100,39,'Digester 02',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,'OK',0,0,0,0,0,NULL,'2026-02-07 17:00:47','2026-02-07 17:00:47'),(101,39,'Digester 03',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,'OK',0,0,0,0,0,NULL,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_digester_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_email_config`
--

DROP TABLE IF EXISTS `mis_email_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_email_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `submit_notify_emails` text COMMENT 'JSON array of email addresses',
  `entry_not_created_emails` text COMMENT 'JSON array of email addresses',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_email_config`
--

LOCK TABLES `mis_email_config` WRITE;
/*!40000 ALTER TABLE `mis_email_config` DISABLE KEYS */;
INSERT INTO `mis_email_config` VALUES (1,'[\"murugesh.k@refex.co.in\"]','[\"sathish.r@refex.co.in\"]');
/*!40000 ALTER TABLE `mis_email_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_feed_data`
--

DROP TABLE IF EXISTS `mis_feed_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_feed_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `feed_type` varchar(255) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `time` time DEFAULT NULL,
  `remarks` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `mis_feed_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_feed_data`
--

LOCK TABLES `mis_feed_data` WRITE;
/*!40000 ALTER TABLE `mis_feed_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `mis_feed_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_feed_mixing_tank`
--

DROP TABLE IF EXISTS `mis_feed_mixing_tank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_feed_mixing_tank` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `cow_dung_qty` float DEFAULT NULL,
  `cow_dung_ts` float DEFAULT NULL,
  `cow_dung_vs` float DEFAULT NULL,
  `pressmud_qty` float DEFAULT NULL,
  `pressmud_ts` float DEFAULT NULL,
  `pressmud_vs` float DEFAULT NULL,
  `permeate_qty` float DEFAULT NULL,
  `permeate_ts` float DEFAULT NULL,
  `permeate_vs` float DEFAULT NULL,
  `water_qty` float DEFAULT NULL,
  `slurry_total` float DEFAULT NULL,
  `slurry_ts` float DEFAULT NULL,
  `slurry_vs` float DEFAULT NULL,
  `slurry_ph` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_feed_mixing_tank_entry_id` (`entry_id`),
  CONSTRAINT `mis_feed_mixing_tank_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_feed_mixing_tank`
--

LOCK TABLES `mis_feed_mixing_tank` WRITE;
/*!40000 ALTER TABLE `mis_feed_mixing_tank` DISABLE KEYS */;
INSERT INTO `mis_feed_mixing_tank` VALUES (1,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,13.8,8.5,65,3.68,9,60,1.84,7,55,11.04,29.44,8,62,7.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,14.85,8.5,65,3.96,9,60,1.98,7,55,11.88,31.68,8,62,7.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,15.9,8.5,65,4.24,9,60,2.12,7,55,12.72,33.92,8,62,7.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,16.95,8.5,65,4.52,9,60,2.26,7,55,13.56,36.16,8,62,7.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,13.35,8.5,65,3.56,9,60,1.78,7,55,10.68,28.48,8,62,7.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,14.4,8.5,65,3.84,9,60,1.92,7,55,11.52,30.72,8,62,7.2,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(8,13,15.45,8.5,65,4.12,9,60,2.06,7,55,12.36,32.96,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,16.5,8.5,65,4.4,9,60,2.2,7,55,13.2,35.2,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,12.9,8.5,65,3.44,9,60,1.72,7,55,10.32,27.52,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,13.95,8.5,65,3.72,9,60,1.86,7,55,11.16,29.76,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,15,8.5,65,4,9,60,2,7,55,12,32,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,16.05,8.5,65,4.28,9,60,2.14,7,55,12.84,34.24,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,17.1,8.5,65,4.56,9,60,2.28,7,55,13.68,36.48,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,13.5,8.5,65,3.6,9,60,1.8,7,55,10.8,28.8,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,14.55,8.5,65,3.88,9,60,1.94,7,55,11.64,31.04,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,15.6,8.5,65,4.16,9,60,2.08,7,55,12.48,33.28,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,16.65,8.5,65,4.44,9,60,2.22,7,55,13.32,35.52,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,13.05,8.5,65,3.48,9,60,1.74,7,55,10.44,27.84,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,14.1,8.5,65,3.76,9,60,1.88,7,55,11.28,30.08,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,15.15,8.5,65,4.04,9,60,2.02,7,55,12.12,32.32,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,16.2,8.5,65,4.32,9,60,2.16,7,55,12.96,34.56,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,17.25,8.5,65,4.6,9,60,2.3,7,55,13.8,36.8,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,13.65,8.5,65,3.64,9,60,1.82,7,55,10.92,29.12,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,14.7,8.5,65,3.92,9,60,1.96,7,55,11.76,31.36,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,15.75,8.5,65,4.2,9,60,2.1,7,55,12.6,33.6,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,16.8,8.5,65,4.48,9,60,2.24,7,55,13.44,35.84,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,13.2,8.5,65,3.52,9,60,1.76,7,55,10.56,28.16,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,14.25,8.5,65,3.8,9,60,1.9,7,55,11.4,30.4,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,15.3,8.5,65,4.08,9,60,2.04,7,55,12.24,32.64,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,16.35,8.5,65,4.36,9,60,2.18,7,55,13.08,34.88,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,12.75,8.5,65,3.4,9,60,1.7,7,55,10.2,27.2,8,62,7.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_feed_mixing_tank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_fertilizer_data`
--

DROP TABLE IF EXISTS `mis_fertilizer_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_fertilizer_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `fom_produced` float DEFAULT NULL,
  `inventory` float DEFAULT NULL,
  `sold` float DEFAULT NULL,
  `weighted_average` float DEFAULT NULL,
  `revenue_1` float DEFAULT NULL,
  `lagoon_liquid_sold` float DEFAULT NULL,
  `revenue_2` float DEFAULT NULL,
  `loose_fom_sold` float DEFAULT NULL,
  `revenue_3` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_fertilizer_data_entry_id` (`entry_id`),
  CONSTRAINT `mis_fertilizer_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_fertilizer_data`
--

LOCK TABLES `mis_fertilizer_data` WRITE;
/*!40000 ALTER TABLE `mis_fertilizer_data` DISABLE KEYS */;
INSERT INTO `mis_fertilizer_data` VALUES (1,6,0,0,0,0,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,2.94,7.36,2.3,4.5,11040,0.92,736,0.46,1840,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,3.17,7.92,2.48,4.5,11880,0.99,792,0.5,1980,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,3.39,8.48,2.65,4.5,12720,1.06,848,0.53,2120,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,3.62,9.04,2.83,4.5,13560,1.13,904,0.56,2260,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,2.85,7.12,2.23,4.5,10680,0.89,712,0.45,1780,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,3.07,7.68,2.4,4.5,11520,0.96,768,0.48,1920,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,3.3,8.24,2.58,4.5,12360,1.03,824,0.52,2060,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,3.52,8.8,2.75,4.5,13200,1.1,880,0.55,2200,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,2.75,6.88,2.15,4.5,10320,0.86,688,0.43,1720,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,2.98,7.44,2.32,4.5,11160,0.93,744,0.47,1860,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,3.2,8,2.5,4.5,12000,1,800,0.5,2000,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,3.42,8.56,2.68,4.5,12840,1.07,856,0.54,2140,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,3.65,9.12,2.85,4.5,13680,1.14,912,0.57,2280,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,2.88,7.2,2.25,4.5,10800,0.9,720,0.45,1800,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,3.1,7.76,2.42,4.5,11640,0.97,776,0.49,1940,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,3.33,8.32,2.6,4.5,12480,1.04,832,0.52,2080,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,3.55,8.88,2.78,4.5,13320,1.11,888,0.56,2220,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,2.78,6.96,2.17,4.5,10440,0.87,696,0.44,1740,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,3.01,7.52,2.35,4.5,11280,0.94,752,0.47,1880,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,3.23,8.08,2.53,4.5,12120,1.01,808,0.51,2020,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,3.46,8.64,2.7,4.5,12960,1.08,864,0.54,2160,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,3.68,9.2,2.88,4.5,13800,1.15,920,0.57,2300,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,2.91,7.28,2.28,4.5,10920,0.91,728,0.46,1820,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,3.14,7.84,2.45,4.5,11760,0.98,784,0.49,1960,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,3.36,8.4,2.63,4.5,12600,1.05,840,0.53,2100,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,3.58,8.96,2.8,4.5,13440,1.12,896,0.56,2240,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,2.82,7.04,2.2,4.5,10560,0.88,704,0.44,1760,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,3.04,7.6,2.38,4.5,11400,0.95,760,0.48,1900,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,3.26,8.16,2.55,4.5,12240,1.02,816,0.51,2040,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,3.49,8.72,2.73,4.5,13080,1.09,872,0.55,2180,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,2.72,6.8,2.13,4.5,10200,0.85,680,0.43,1700,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_fertilizer_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_hse_data`
--

DROP TABLE IF EXISTS `mis_hse_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_hse_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `safety_lti` int DEFAULT NULL,
  `near_misses` int DEFAULT NULL,
  `first_aid` int DEFAULT NULL,
  `reportable_incidents` int DEFAULT NULL,
  `mti` int DEFAULT NULL,
  `other_incidents` int DEFAULT NULL,
  `fatalities` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_hse_data_entry_id` (`entry_id`),
  CONSTRAINT `mis_hse_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_hse_data`
--

LOCK TABLES `mis_hse_data` WRITE;
/*!40000 ALTER TABLE `mis_hse_data` DISABLE KEYS */;
INSERT INTO `mis_hse_data` VALUES (1,6,0,0,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,0,0,0,0,0,0,0,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,0,0,0,0,0,0,0,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,0,0,0,0,0,0,0,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,0,0,0,0,0,0,0,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,0,0,0,0,0,0,0,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,0,1,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,0,1,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,0,1,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,0,1,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,0,0,0,0,0,0,0,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_hse_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_manpower_data`
--

DROP TABLE IF EXISTS `mis_manpower_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_manpower_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `refex_srel_staff` int DEFAULT NULL,
  `third_party_staff` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `mis_manpower_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_manpower_data`
--

LOCK TABLES `mis_manpower_data` WRITE;
/*!40000 ALTER TABLE `mis_manpower_data` DISABLE KEYS */;
INSERT INTO `mis_manpower_data` VALUES (1,6,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,12,5,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,12,5,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,12,5,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,12,5,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,12,5,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,12,5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_manpower_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_plant_availability`
--

DROP TABLE IF EXISTS `mis_plant_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_plant_availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `working_hours` float DEFAULT NULL,
  `scheduled_downtime` float DEFAULT NULL,
  `unscheduled_downtime` float DEFAULT NULL,
  `total_availability` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_plant_availability_entry_id` (`entry_id`),
  CONSTRAINT `mis_plant_availability_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_plant_availability`
--

LOCK TABLES `mis_plant_availability` WRITE;
/*!40000 ALTER TABLE `mis_plant_availability` DISABLE KEYS */;
INSERT INTO `mis_plant_availability` VALUES (1,6,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,24,0,0.46,90.16,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,24,0,0.5,97.02,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,24,0,0.53,103.88,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,24,0,0.56,110.74,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,24,0,0.45,87.22,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,24,0,0.48,94.08,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,24,0,0.52,100.94,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,24,0,0.55,107.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,24,0,0.43,84.28,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,24,0,0.47,91.14,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,24,0,0.5,98,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,24,0,0.54,104.86,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,24,0,0.57,111.72,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,24,0,0.45,88.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,24,0,0.49,95.06,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,24,0,0.52,101.92,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,24,0,0.56,108.78,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,24,0,0.44,85.26,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,24,0,0.47,92.12,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,24,0,0.51,98.98,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,24,0,0.54,105.84,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,24,0,0.57,112.7,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,24,0,0.46,89.18,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,24,0,0.49,96.04,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,24,0,0.53,102.9,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,24,0,0.56,109.76,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,24,0,0.44,86.24,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,24,0,0.48,93.1,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,24,0,0.51,99.96,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,24,0,0.55,106.82,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,24,0,0.43,83.3,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_plant_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_power_data`
--

DROP TABLE IF EXISTS `mis_power_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_power_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `equipment_name` varchar(255) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `total_hours` float DEFAULT NULL,
  `energy_consumed` float DEFAULT NULL,
  `remarks` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `mis_power_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_power_data`
--

LOCK TABLES `mis_power_data` WRITE;
/*!40000 ALTER TABLE `mis_power_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `mis_power_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_raw_biogas`
--

DROP TABLE IF EXISTS `mis_raw_biogas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_raw_biogas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `digester_01_gas` float DEFAULT NULL,
  `digester_02_gas` float DEFAULT NULL,
  `digester_03_gas` float DEFAULT NULL,
  `total_raw_biogas` float DEFAULT NULL,
  `rbg_flared` float DEFAULT NULL,
  `gas_yield` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_raw_biogas_entry_id` (`entry_id`),
  CONSTRAINT `mis_raw_biogas_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_raw_biogas`
--

LOCK TABLES `mis_raw_biogas` WRITE;
/*!40000 ALTER TABLE `mis_raw_biogas` DISABLE KEYS */;
INSERT INTO `mis_raw_biogas` VALUES (1,6,0,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,1288,1306.4,1269.6,3864,46,0.31,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,1386,1405.8,1366.2,4158,49.5,0.32,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,1484,1505.2,1462.8,4452,53,0.33,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,1582,1604.6,1559.4,4746,56.5,0.33,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,1246,1263.8,1228.2,3738,44.5,0.31,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,1344,1363.2,1324.8,4032,48,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,1442,1462.6,1421.4,4326,51.5,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,1540,1562,1518,4620,55,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,1204,1221.2,1186.8,3612,43,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,1302,1320.6,1283.4,3906,46.5,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,1400,1420,1380,4200,50,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,1498,1519.4,1476.6,4494,53.5,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,1596,1618.8,1573.2,4788,57,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,1260,1278,1242,3780,45,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,1358,1377.4,1338.6,4074,48.5,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,1456,1476.8,1435.2,4368,52,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,1554,1576.2,1531.8,4662,55.5,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,1218,1235.4,1200.6,3654,43.5,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,1316,1334.8,1297.2,3948,47,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,1414,1434.2,1393.8,4242,50.5,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,1512,1533.6,1490.4,4536,54,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,1610,1633,1587,4830,57.5,0.34,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,1274,1292.2,1255.8,3822,45.5,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,1372,1391.6,1352.4,4116,49,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,1470,1491,1449,4410,52.5,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,1568,1590.4,1545.6,4704,56,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,1232,1249.6,1214.4,3696,44,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,1330,1349,1311,3990,47.5,0.31,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,1428,1448.4,1407.6,4284,51,0.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,1526,1547.8,1504.2,4578,54.5,0.33,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,1190,1207,1173,3570,42.5,0.3,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_raw_biogas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_raw_biogas_quality`
--

DROP TABLE IF EXISTS `mis_raw_biogas_quality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_raw_biogas_quality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `ch4` float DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `h2s` float DEFAULT NULL,
  `o2` float DEFAULT NULL,
  `n2` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `mis_raw_biogas_quality_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_raw_biogas_quality`
--

LOCK TABLES `mis_raw_biogas_quality` WRITE;
/*!40000 ALTER TABLE `mis_raw_biogas_quality` DISABLE KEYS */;
INSERT INTO `mis_raw_biogas_quality` VALUES (1,6,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,55,38,75.73,0.5,6,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,55,38,79.47,0.5,6,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,55,38,83.2,0.5,6,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,55,38,86.93,0.5,6,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,55,38,74.13,0.5,6,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,55,38,77.87,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,55,38,81.6,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,55,38,85.33,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,55,38,72.53,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,55,38,76.27,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,55,38,80,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,55,38,83.73,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,55,38,87.47,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,55,38,74.67,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,55,38,78.4,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,55,38,82.13,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,55,38,85.87,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,55,38,73.07,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,55,38,76.8,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,55,38,80.53,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,55,38,84.27,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,55,38,88,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,55,38,75.2,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,55,38,78.93,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,55,38,82.67,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,55,38,86.4,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,55,38,73.6,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,55,38,77.33,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,55,38,81.07,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,55,38,84.8,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,55,38,72,0.5,6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_raw_biogas_quality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_raw_materials`
--

DROP TABLE IF EXISTS `mis_raw_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_raw_materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `cow_dung_purchased` float DEFAULT NULL,
  `cow_dung_stock` float DEFAULT NULL,
  `old_press_mud_opening_balance` float DEFAULT NULL,
  `old_press_mud_purchased` float DEFAULT NULL,
  `old_press_mud_degradation_loss` float DEFAULT NULL,
  `old_press_mud_closing_stock` float DEFAULT NULL,
  `new_press_mud_purchased` float DEFAULT NULL,
  `press_mud_used` float DEFAULT NULL,
  `total_press_mud_stock` float DEFAULT NULL,
  `audit_note` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_raw_materials_entry_id` (`entry_id`),
  CONSTRAINT `mis_raw_materials_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_raw_materials`
--

LOCK TABLES `mis_raw_materials` WRITE;
/*!40000 ALTER TABLE `mis_raw_materials` DISABLE KEYS */;
INSERT INTO `mis_raw_materials` VALUES (1,1,100,50,0,0,0,0,0,0,0,NULL,'2026-02-07 04:50:00','2026-02-07 04:50:00'),(2,6,12,0,0,0,0,0,0,0,0,'','2026-02-07 07:21:41','2026-02-07 07:21:41'),(3,7,11.04,7.36,4.6,2.76,0.18,4.14,1.84,5.52,9.2,'Seed data 2026-01-01','2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,8,11.88,7.92,4.95,2.97,0.2,4.46,1.98,5.94,9.9,'Seed data 2026-01-02','2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,9,12.72,8.48,5.3,3.18,0.21,4.77,2.12,6.36,10.6,'Seed data 2026-01-03','2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,10,13.56,9.04,5.65,3.39,0.23,5.08,2.26,6.78,11.3,'Seed data 2026-01-04','2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,11,10.68,7.12,4.45,2.67,0.18,4.01,1.78,5.34,8.9,'Seed data 2026-01-05','2026-02-07 07:59:24','2026-02-07 07:59:24'),(8,12,11.52,7.68,4.8,2.88,0.19,4.32,1.92,5.76,9.6,'Seed data 2026-01-06','2026-02-07 07:59:24','2026-02-07 07:59:24'),(9,13,12.36,8.24,5.15,3.09,0.21,4.64,2.06,6.18,10.3,'Seed data 2026-01-07','2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,14,13.2,8.8,5.5,3.3,0.22,4.95,2.2,6.6,11,'Seed data 2026-01-08','2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,15,10.32,6.88,4.3,2.58,0.17,3.87,1.72,5.16,8.6,'Seed data 2026-01-09','2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,16,11.16,7.44,4.65,2.79,0.19,4.18,1.86,5.58,9.3,'Seed data 2026-01-10','2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,17,12,8,5,3,0.2,4.5,2,6,10,'Seed data 2026-01-11','2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,18,12.84,8.56,5.35,3.21,0.21,4.82,2.14,6.42,10.7,'Seed data 2026-01-12','2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,19,13.68,9.12,5.7,3.42,0.23,5.13,2.28,6.84,11.4,'Seed data 2026-01-13','2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,20,10.8,7.2,4.5,2.7,0.18,4.05,1.8,5.4,9,'Seed data 2026-01-14','2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,21,11.64,7.76,4.85,2.91,0.19,4.37,1.94,5.82,9.7,'Seed data 2026-01-15','2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,22,12.48,8.32,5.2,3.12,0.21,4.68,2.08,6.24,10.4,'Seed data 2026-01-16','2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,23,13.32,8.88,5.55,3.33,0.22,5,2.22,6.66,11.1,'Seed data 2026-01-17','2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,24,10.44,6.96,4.35,2.61,0.17,3.92,1.74,5.22,8.7,'Seed data 2026-01-18','2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,25,11.28,7.52,4.7,2.82,0.19,4.23,1.88,5.64,9.4,'Seed data 2026-01-19','2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,26,12.12,8.08,5.05,3.03,0.2,4.55,2.02,6.06,10.1,'Seed data 2026-01-20','2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,27,12.96,8.64,5.4,3.24,0.22,4.86,2.16,6.48,10.8,'Seed data 2026-01-21','2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,28,13.8,9.2,5.75,3.45,0.23,5.18,2.3,6.9,11.5,'Seed data 2026-01-22','2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,29,10.92,7.28,4.55,2.73,0.18,4.1,1.82,5.46,9.1,'Seed data 2026-01-23','2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,30,11.76,7.84,4.9,2.94,0.2,4.41,1.96,5.88,9.8,'Seed data 2026-01-24','2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,31,12.6,8.4,5.25,3.15,0.21,4.73,2.1,6.3,10.5,'Seed data 2026-01-25','2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,32,13.44,8.96,5.6,3.36,0.22,5.04,2.24,6.72,11.2,'Seed data 2026-01-26','2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,33,10.56,7.04,4.4,2.64,0.18,3.96,1.76,5.28,8.8,'Seed data 2026-01-27','2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,34,11.4,7.6,4.75,2.85,0.19,4.27,1.9,5.7,9.5,'Seed data 2026-01-28','2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,35,12.24,8.16,5.1,3.06,0.2,4.59,2.04,6.12,10.2,'Seed data 2026-01-29','2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,36,13.08,8.72,5.45,3.27,0.22,4.91,2.18,6.54,10.9,'Seed data 2026-01-30','2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,37,10.2,6.8,4.25,2.55,0.17,3.83,1.7,5.1,8.5,'Seed data 2026-01-31','2026-02-07 07:59:25','2026-02-07 07:59:25'),(34,39,123,123,0,0,0,0,0,0,0,'','2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_raw_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_sls_data`
--

DROP TABLE IF EXISTS `mis_sls_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_sls_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `water_consumption` float DEFAULT NULL,
  `poly_electrolyte` float DEFAULT NULL,
  `solution` float DEFAULT NULL,
  `slurry_feed` float DEFAULT NULL,
  `wet_cake_prod` float DEFAULT NULL,
  `wet_cake_ts` float DEFAULT NULL,
  `wet_cake_vs` float DEFAULT NULL,
  `liquid_produced` float DEFAULT NULL,
  `liquid_ts` float DEFAULT NULL,
  `liquid_vs` float DEFAULT NULL,
  `liquid_sent_to_lagoon` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_sls_data_entry_id` (`entry_id`),
  CONSTRAINT `mis_sls_data_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_sls_data`
--

LOCK TABLES `mis_sls_data` WRITE;
/*!40000 ALTER TABLE `mis_sls_data` DISABLE KEYS */;
INSERT INTO `mis_sls_data` VALUES (1,6,0,0,0,0,0,0,0,0,0,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,4.6,11.04,7.36,23,4.14,28,70,16.56,2,15,14.72,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,4.95,11.88,7.92,24.75,4.46,28,70,17.82,2,15,15.84,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,5.3,12.72,8.48,26.5,4.77,28,70,19.08,2,15,16.96,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,5.65,13.56,9.04,28.25,5.08,28,70,20.34,2,15,18.08,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,4.45,10.68,7.12,22.25,4.01,28,70,16.02,2,15,14.24,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,4.8,11.52,7.68,24,4.32,28,70,17.28,2,15,15.36,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,5.15,12.36,8.24,25.75,4.64,28,70,18.54,2,15,16.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,5.5,13.2,8.8,27.5,4.95,28,70,19.8,2,15,17.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,4.3,10.32,6.88,21.5,3.87,28,70,15.48,2,15,13.76,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,4.65,11.16,7.44,23.25,4.18,28,70,16.74,2,15,14.88,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,5,12,8,25,4.5,28,70,18,2,15,16,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,5.35,12.84,8.56,26.75,4.82,28,70,19.26,2,15,17.12,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,5.7,13.68,9.12,28.5,5.13,28,70,20.52,2,15,18.24,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,4.5,10.8,7.2,22.5,4.05,28,70,16.2,2,15,14.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,4.85,11.64,7.76,24.25,4.37,28,70,17.46,2,15,15.52,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,5.2,12.48,8.32,26,4.68,28,70,18.72,2,15,16.64,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,5.55,13.32,8.88,27.75,5,28,70,19.98,2,15,17.76,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,4.35,10.44,6.96,21.75,3.92,28,70,15.66,2,15,13.92,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,4.7,11.28,7.52,23.5,4.23,28,70,16.92,2,15,15.04,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,5.05,12.12,8.08,25.25,4.55,28,70,18.18,2,15,16.16,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,5.4,12.96,8.64,27,4.86,28,70,19.44,2,15,17.28,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,5.75,13.8,9.2,28.75,5.18,28,70,20.7,2,15,18.4,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,4.55,10.92,7.28,22.75,4.1,28,70,16.38,2,15,14.56,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,4.9,11.76,7.84,24.5,4.41,28,70,17.64,2,15,15.68,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,5.25,12.6,8.4,26.25,4.73,28,70,18.9,2,15,16.8,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,5.6,13.44,8.96,28,5.04,28,70,20.16,2,15,17.92,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,4.4,10.56,7.04,22,3.96,28,70,15.84,2,15,14.08,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,4.75,11.4,7.6,23.75,4.27,28,70,17.1,2,15,15.2,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,5.1,12.24,8.16,25.5,4.59,28,70,18.36,2,15,16.32,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,5.45,13.08,8.72,27.25,4.91,28,70,19.62,2,15,17.44,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,4.25,10.2,6.8,21.25,3.83,28,70,15.3,2,15,13.6,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,0,0,0,0,0,0,0,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_sls_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mis_utilities`
--

DROP TABLE IF EXISTS `mis_utilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_utilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `electricity_consumption` float DEFAULT NULL,
  `specific_power_consumption` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mis_utilities_entry_id` (`entry_id`),
  CONSTRAINT `mis_utilities_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_utilities`
--

LOCK TABLES `mis_utilities` WRITE;
/*!40000 ALTER TABLE `mis_utilities` DISABLE KEYS */;
INSERT INTO `mis_utilities` VALUES (1,6,0,0,'2026-02-07 07:21:41','2026-02-07 07:21:41'),(2,7,386.4,0.48,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(3,8,415.8,0.49,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(4,9,445.2,0.5,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(5,10,474.6,0.51,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(6,11,373.8,0.47,'2026-02-07 07:59:24','2026-02-07 07:59:24'),(7,12,403.2,0.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(8,13,432.6,0.49,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(9,14,462,0.51,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(10,15,361.2,0.47,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(11,16,390.6,0.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(12,17,420,0.49,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(13,18,449.4,0.5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(14,19,478.8,0.51,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(15,20,378,0.47,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(16,21,407.4,0.49,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(17,22,436.8,0.5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(18,23,466.2,0.51,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(19,24,365.4,0.47,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(20,25,394.8,0.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(21,26,424.2,0.49,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(22,27,453.6,0.5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(23,28,483,0.51,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(24,29,382.2,0.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(25,30,411.6,0.49,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(26,31,441,0.5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(27,32,470.4,0.51,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(28,33,369.6,0.47,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(29,34,399,0.48,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(30,35,428.4,0.49,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(31,36,457.8,0.5,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(32,37,357,0.47,'2026-02-07 07:59:25','2026-02-07 07:59:25'),(33,39,0,0,'2026-02-07 17:00:47','2026-02-07 17:00:47');
/*!40000 ALTER TABLE `mis_utilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'e.g., mis_entry:create, report:view',
  `description` varchar(255) DEFAULT NULL,
  `resource` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'mis_entry:create',NULL,'mis_entry','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(2,'mis_entry:read',NULL,'mis_entry','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(3,'mis_entry:update',NULL,'mis_entry','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(4,'mis_entry:delete',NULL,'mis_entry','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(5,'mis_entry:submit',NULL,'mis_entry','submit','2026-02-07 04:43:02','2026-02-07 04:43:02'),(6,'mis_entry:approve',NULL,'mis_entry','approve','2026-02-07 04:43:02','2026-02-07 04:43:02'),(7,'mis_entry:import',NULL,'mis_entry','import','2026-02-07 04:43:02','2026-02-07 04:43:02'),(8,'mis_entry:export',NULL,'mis_entry','export','2026-02-07 04:43:02','2026-02-07 04:43:02'),(9,'user:read',NULL,'user','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(10,'user:create',NULL,'user','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(11,'user:update',NULL,'user','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(12,'user:delete',NULL,'user','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(13,'role:read',NULL,'role','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(14,'role:create',NULL,'role','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(15,'role:update',NULL,'role','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(16,'role:delete',NULL,'role','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(17,'config:read',NULL,'config','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(18,'config:create',NULL,'config','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(19,'config:update',NULL,'config','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(20,'config:delete',NULL,'config','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(21,'audit:read',NULL,'audit','read','2026-02-07 04:43:02','2026-02-07 04:43:02');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  UNIQUE KEY `role_permissions_role_id_permission_id_unique` (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  KEY `role_permissions_role_id_permission_id` (`role_id`,`permission_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1),(2,1),(3,1),(1,2),(2,2),(3,2),(1,3),(2,3),(3,3),(1,4),(2,4),(1,5),(2,5),(3,5),(1,6),(2,6),(1,7),(2,7),(1,8),(2,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(2,21);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','System Administrator','2026-02-07 04:43:02','2026-02-07 04:43:02'),(2,'Manager','Plant Manager','2026-02-07 04:43:02','2026-02-07 04:43:02'),(3,'Operator','Data Entry Operator','2026-02-07 04:43:02','2026-02-07 04:43:02');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smtp_config`
--

DROP TABLE IF EXISTS `smtp_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `smtp_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `host` varchar(255) DEFAULT NULL,
  `port` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `from_email` varchar(255) DEFAULT NULL,
  `secure` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smtp_config`
--

LOCK TABLES `smtp_config` WRITE;
/*!40000 ALTER TABLE `smtp_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `smtp_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smtp_configs`
--

DROP TABLE IF EXISTS `smtp_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `smtp_configs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `host` varchar(255) NOT NULL,
  `port` int DEFAULT '587',
  `secure` tinyint(1) DEFAULT '0',
  `auth_user` varchar(255) NOT NULL,
  `auth_pass` varchar(255) NOT NULL,
  `from_email` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smtp_configs`
--

LOCK TABLES `smtp_configs` WRITE;
/*!40000 ALTER TABLE `smtp_configs` DISABLE KEYS */;
INSERT INTO `smtp_configs` VALUES (1,'smtp.gmail.com',587,1,'tech@helpdesksupport.co.in','upkm vblu wdla pexq','tech@helpdesksupport.co.in',1);
/*!40000 ALTER TABLE `smtp_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_activity_logs`
--

DROP TABLE IF EXISTS `user_activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity_type` varchar(255) NOT NULL,
  `description` text,
  `metadata` json DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_activity_logs`
--

LOCK TABLES `user_activity_logs` WRITE;
/*!40000 ALTER TABLE `user_activity_logs` DISABLE KEYS */;
INSERT INTO `user_activity_logs` VALUES (1,1,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 04:49:37','2026-02-07 04:49:37'),(2,1,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 04:50:00','2026-02-07 04:50:00'),(3,1,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 05:01:18','2026-02-07 05:01:18'),(4,1,'LOGOUT','User logged out',NULL,'::1','2026-02-07 05:17:23','2026-02-07 05:17:23'),(5,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 05:17:29','2026-02-07 05:17:29'),(6,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 06:04:47','2026-02-07 06:04:47'),(7,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 06:04:52','2026-02-07 06:04:52'),(8,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:07:17','2026-02-07 07:07:17'),(9,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 07:28:03','2026-02-07 07:28:03'),(10,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:28:08','2026-02-07 07:28:08'),(11,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 07:32:06','2026-02-07 07:32:06'),(12,5,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:32:11','2026-02-07 07:32:11'),(13,5,'LOGOUT','User logged out',NULL,'::1','2026-02-07 07:47:18','2026-02-07 07:47:18'),(14,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:47:25','2026-02-07 07:47:25'),(15,5,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 08:00:15','2026-02-07 08:00:15'),(16,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 13:30:43','2026-02-07 13:30:43'),(17,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 13:36:17','2026-02-07 13:36:17'),(18,5,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 13:36:36','2026-02-07 13:36:36'),(19,5,'LOGOUT','User logged out',NULL,'::1','2026-02-07 14:55:44','2026-02-07 14:55:44'),(20,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 14:55:53','2026-02-07 14:55:53'),(21,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 15:07:38','2026-02-07 15:07:38'),(22,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 15:15:54','2026-02-07 15:15:54'),(23,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 15:16:00','2026-02-07 15:16:00'),(24,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 15:16:04','2026-02-07 15:16:04'),(25,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 15:20:06','2026-02-07 15:20:06'),(26,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 15:20:10','2026-02-07 15:20:10'),(27,5,'LOGIN_FAILED','Invalid password',NULL,'::1','2026-02-07 16:02:29','2026-02-07 16:02:29'),(28,4,'LOGIN_FAILED','Invalid password',NULL,'::1','2026-02-07 16:02:51','2026-02-07 16:02:51'),(29,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 16:02:54','2026-02-07 16:02:54'),(30,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 17:01:27','2026-02-07 17:01:27');
/*!40000 ALTER TABLE `user_activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permissions` (
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`),
  UNIQUE KEY `user_permissions_user_id_permission_id_unique` (`user_id`,`permission_id`),
  UNIQUE KEY `user_permissions_user_id_permission_id` (`user_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  KEY `user_permissions_user_id` (`user_id`),
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  KEY `users_role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Admin','admin@biogas.com','$2b$10$7Xigu4906djS9wZUH62z5.QWiccx317IGt3FCnrVJrQjVWA1zgctq',1,1,'2026-02-07 04:43:02','2026-02-07 04:43:02'),(2,'John Operator','operator@biogas.com','$2b$10$G8x.GwxdNxr4Ebs2AbeQNOI4/W2bEKSqgBvwCclhiUtEEYpuYUHmW',3,0,'2026-02-07 04:43:02','2026-02-07 05:07:27'),(3,'Jane Manager','manager@biogas.com','$2b$10$PWhHka5OXZaYJSRJQqgEW.SXeh7Le1jWIZlltwfTB/0Izi9eE0AYS',2,0,'2026-02-07 04:43:02','2026-02-07 05:07:24'),(4,'Raghul','raghul.je@refex.co.in','$2b$10$GmEet3rXj/icv4ZXHHbOPeq5cuDqC9YuOOoVr0ae4Nu/Mfac4Te6G',1,1,'2026-02-07 05:02:49','2026-02-07 05:02:49'),(5,'Murugesh','murugesh.k@refex.co.in','$2b$10$Skuw4CmjMECBpiM.7FKgA.JciZGyoTkTckBc69VOYReomUVdOLRYK',1,1,'2026-02-07 05:05:05','2026-02-07 05:05:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'biogas_mis'
--

--
-- Dumping routines for database 'biogas_mis'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-07 22:51:31
