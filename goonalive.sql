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
-- Table structure for table `app_config`
--

DROP TABLE IF EXISTS `app_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `key_2` (`key`),
  UNIQUE KEY `key_3` (`key`),
  UNIQUE KEY `key_4` (`key`),
  UNIQUE KEY `key_5` (`key`),
  UNIQUE KEY `key_6` (`key`),
  UNIQUE KEY `key_7` (`key`),
  UNIQUE KEY `key_8` (`key`),
  UNIQUE KEY `key_9` (`key`),
  UNIQUE KEY `key_10` (`key`),
  UNIQUE KEY `key_11` (`key`),
  UNIQUE KEY `key_12` (`key`),
  UNIQUE KEY `key_13` (`key`),
  UNIQUE KEY `key_14` (`key`),
  UNIQUE KEY `key_15` (`key`),
  UNIQUE KEY `key_16` (`key`),
  UNIQUE KEY `key_17` (`key`),
  UNIQUE KEY `key_18` (`key`),
  UNIQUE KEY `key_19` (`key`),
  UNIQUE KEY `key_20` (`key`),
  UNIQUE KEY `key_21` (`key`),
  UNIQUE KEY `key_22` (`key`),
  UNIQUE KEY `key_23` (`key`),
  UNIQUE KEY `key_24` (`key`),
  UNIQUE KEY `key_25` (`key`),
  UNIQUE KEY `key_26` (`key`),
  UNIQUE KEY `key_27` (`key`),
  UNIQUE KEY `key_28` (`key`),
  UNIQUE KEY `key_29` (`key`),
  UNIQUE KEY `key_30` (`key`),
  UNIQUE KEY `key_31` (`key`),
  UNIQUE KEY `key_32` (`key`),
  UNIQUE KEY `key_33` (`key`),
  UNIQUE KEY `key_34` (`key`),
  UNIQUE KEY `key_35` (`key`),
  UNIQUE KEY `key_36` (`key`),
  UNIQUE KEY `key_37` (`key`),
  UNIQUE KEY `key_38` (`key`),
  UNIQUE KEY `key_39` (`key`),
  UNIQUE KEY `key_40` (`key`),
  UNIQUE KEY `key_41` (`key`),
  UNIQUE KEY `key_42` (`key`),
  UNIQUE KEY `key_43` (`key`),
  UNIQUE KEY `key_44` (`key`),
  UNIQUE KEY `key_45` (`key`),
  UNIQUE KEY `key_46` (`key`),
  UNIQUE KEY `key_47` (`key`),
  UNIQUE KEY `key_48` (`key`),
  UNIQUE KEY `key_49` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_config`
--

LOCK TABLES `app_config` WRITE;
/*!40000 ALTER TABLE `app_config` DISABLE KEYS */;
INSERT INTO `app_config` VALUES (1,'theme','classic','2026-02-09 08:52:13','2026-02-09 09:33:57');
/*!40000 ALTER TABLE `app_config` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,1,'CREATE_MIS_ENTRY','MISDailyEntry','1',NULL,'{\"id\": 1, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T04:50:00.411Z\", \"updatedAt\": \"2026-02-07T04:50:00.411Z\", \"created_by\": 1, \"review_comment\": \"Integration test entry\"}','::1','node','2026-02-07 04:50:00','2026-02-07 04:50:00'),(2,1,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": null, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"manpower\": null, \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"digesters\": [{\"id\": 1, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": null, \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"utilities\": null, \"created_by\": 1, \"fertilizer\": null, \"slsMachine\": null, \"compressors\": null, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"audit_note\": null, \"cow_dung_stock\": 50, \"press_mud_used\": 0, \"cow_dung_purchased\": 100, \"total_press_mud_stock\": 0, \"new_press_mud_purchased\": 0, \"old_press_mud_purchased\": 0, \"old_press_mud_closing_stock\": 0, \"old_press_mud_opening_balance\": 0, \"old_press_mud_degradation_loss\": 0}, \"feedMixingTank\": null, \"review_comment\": \"Integration test entry\", \"compressedBiogas\": null, \"rawBiogasQuality\": null, \"plantAvailability\": null}',NULL,'::1','node','2026-02-07 04:50:00','2026-02-07 04:50:00'),(3,1,'CREATE_USER','User','4',NULL,'{\"name\": \"Raghul\", \"email\": \"raghul.je@refex.co.in\", \"role_id\": 1}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:02:49','2026-02-07 05:02:49'),(4,1,'CREATE_USER','User','5',NULL,'{\"name\": \"Murugesh\", \"email\": \"murugesh.k@refex.co.in\", \"role_id\": 1}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:05:06','2026-02-07 05:05:06'),(5,1,'DEACTIVATE_USER','User','3','{\"id\": 3, \"name\": \"Jane Manager\", \"email\": \"manager@biogas.com\", \"role_id\": 2, \"password\": \"$2b$10$PWhHka5OXZaYJSRJQqgEW.SXeh7Le1jWIZlltwfTB/0Izi9eE0AYS\", \"createdAt\": \"2026-02-07T04:43:02.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-07T04:43:02.000Z\"}','{\"is_active\": false}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:07:24','2026-02-07 05:07:24'),(6,1,'DEACTIVATE_USER','User','2','{\"id\": 2, \"name\": \"John Operator\", \"email\": \"operator@biogas.com\", \"role_id\": 3, \"password\": \"$2b$10$G8x.GwxdNxr4Ebs2AbeQNOI4/W2bEKSqgBvwCclhiUtEEYpuYUHmW\", \"createdAt\": \"2026-02-07T04:43:02.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-07T04:43:02.000Z\"}','{\"is_active\": false}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:07:27','2026-02-07 05:07:27'),(7,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:08:26','2026-02-07 05:08:26'),(8,1,'UPDATE_USER','User','4','{\"id\": 4, \"name\": \"Raghul\", \"email\": \"raghul.je@refex.co.in\", \"role_id\": 1, \"password\": \"$2b$10$GmEet3rXj/icv4ZXHHbOPeq5cuDqC9YuOOoVr0ae4Nu/Mfac4Te6G\", \"createdAt\": \"2026-02-07T05:02:49.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-07T05:02:49.000Z\"}','{\"name\": \"Raghul\", \"email\": \"raghul.je@refex.co.in\", \"role_id\": 1}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:08:44','2026-02-07 05:08:44'),(9,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:09:12','2026-02-07 05:09:12'),(10,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:19','2026-02-07 05:13:19'),(11,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:26','2026-02-07 05:13:26'),(12,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 11, 12, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:37','2026-02-07 05:13:37'),(13,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 11, 12, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:13:51','2026-02-07 05:13:51'),(14,1,'UPDATE_ROLE_PERMISSIONS','Role','1',NULL,'{\"permissionIds\": [17, 18, 19, 20, 2, 1, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 5, 6, 7, 8]}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:14:25','2026-02-07 05:14:25'),(15,4,'UPDATE_SMTP_CONFIG','SMTPConfig','1',NULL,'{\"host\": \"smtp.gmail.com\", \"port\": 587, \"secure\": true, \"auth_pass\": \"upkm vblu wdla pexq\", \"auth_user\": \"tech@helpdesksupport.co.in\", \"from_name\": \"SREL\", \"from_email\": \"tech@helpdesksupport.co.in\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 05:25:47','2026-02-07 05:25:47'),(16,4,'CREATE_MIS_ENTRY','MISDailyEntry','6',NULL,'{\"id\": 6, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:21:41.074Z\", \"updatedAt\": \"2026-02-07T07:21:41.074Z\", \"created_by\": 4, \"review_comment\": null}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 07:21:41','2026-02-07 07:21:41'),(17,4,'SUBMIT_ENTRY','MISDailyEntry','6',NULL,'{\"status\": \"submitted\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 07:21:41','2026-02-07 07:21:41'),(18,4,'DELETE_MIS_ENTRY','MISDailyEntry','6','{\"id\": 6, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:21:41.000Z\", \"updatedAt\": \"2026-02-07T07:21:41.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 13:05:52','2026-02-07 13:05:52'),(19,4,'DELETE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T04:50:00.000Z\", \"updatedAt\": \"2026-02-07T04:50:00.000Z\", \"created_by\": 1, \"review_comment\": \"Updated integration test entry\"}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 13:05:57','2026-02-07 13:05:57'),(20,4,'CREATE_MIS_ENTRY','MISDailyEntry','39',NULL,'{\"id\": 39, \"date\": \"2026-02-20\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T17:00:47.476Z\", \"updatedAt\": \"2026-02-07T17:00:47.476Z\", \"created_by\": 4, \"review_comment\": null}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 17:00:47','2026-02-07 17:00:47'),(21,4,'SUBMIT_ENTRY','MISDailyEntry','39',NULL,'{\"status\": \"submitted\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-07 17:00:48','2026-02-07 17:00:48'),(22,4,'UPDATE_EMAIL_TEMPLATE','EmailTemplate','1','{\"id\": 1, \"body\": \"<p>Hello,</p><p>The MIS entry for {{date}} has NOT been created yet. Please create it immediately.</p>\", \"name\": \"mis_not_created\", \"subject\": \"MIS Entry Missing for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','{\"id\": 1, \"body\": \"<p>Hello,</p><p>The MIS entry for {{date}} has NOT been created yet. Please create it immediately.</p>\", \"name\": \"mis_not_created\", \"subject\": \"MIS Entry Missing for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-08 06:53:11','2026-02-08 06:53:11'),(23,4,'UPDATE_EMAIL_TEMPLATE','EmailTemplate','3','{\"id\": 3, \"body\": \"<p>Hello Manager,</p><p>The MIS entry for {{date}} has not been submitted by the deadline. Please investigate.</p>\", \"name\": \"mis_escalation\", \"subject\": \"ESCALATION: MIS Entry Overdue for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','{\"id\": 3, \"body\": \"<p>Hello Manager,</p><p>The MIS entry for {{date}} has not been submitted by the deadline. Please investigate.</p>\", \"name\": \"mis_escalation\", \"subject\": \"ESCALATION: MIS Entry Overdue for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-08 06:53:14','2026-02-08 06:53:14'),(24,4,'UPDATE_EMAIL_TEMPLATE','EmailTemplate','1','{\"id\": 1, \"body\": \"<p>Hello,</p><p>The MIS entry for {{date}} has NOT been created yet. Please create it immediately.</p>\", \"name\": \"mis_not_created\", \"subject\": \"MIS Entry Missing for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','{\"id\": 1, \"body\": \"<p>Hello,</p><p>The MIS entry for {{date}} has NOT been created yet. Please create it immediately.</p>\", \"name\": \"mis_not_created\", \"subject\": \"MIS Entry Missing for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-08 06:53:16','2026-02-08 06:53:16'),(25,4,'UPDATE_EMAIL_TEMPLATE','EmailTemplate','2','{\"id\": 2, \"body\": \"<p>Hello,</p><p>The MIS entry for {{date}} is created but NOT submitted. Please submit it immediately.</p>\", \"name\": \"mis_not_submitted\", \"subject\": \"MIS Entry Pending Submission for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','{\"id\": 2, \"body\": \"<p>Hello,</p><p>The MIS entry for {{date}} is created but NOT submitted. Please submit it immediately.</p>\", \"name\": \"mis_not_submitted\", \"subject\": \"MIS Entry Pending Submission for {{date}}\", \"createdAt\": \"2026-02-08T06:44:51.000Z\", \"updatedAt\": \"2026-02-08T06:44:51.000Z\"}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-08 06:53:18','2026-02-08 06:53:18'),(26,4,'UPDATE_MIS_ENTRY','MISDailyEntry','37','{\"id\": 37, \"hse\": {\"id\": 32, \"mti\": 0, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-01-31\", \"shift\": \"General\", \"status\": \"submitted\", \"manpower\": {\"id\": 32, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"refex_srel_staff\": 12, \"third_party_staff\": 5}, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"digesters\": [{\"id\": 96, \"ph\": 7.2, \"ash\": 18, \"hrt\": 28, \"olr\": 2.5, \"vfa\": 2.5, \"temp\": 38, \"lignin\": 12, \"density\": 1.02, \"remarks\": null, \"entry_id\": 37, \"pressure\": 1, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"alkalinity\": 4.2, \"slurry_level\": 63.75, \"balloon_level\": 80, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0.6, \"feeding_slurry\": 8.5, \"vs_destruction\": 72, \"agitator_runtime\": null, \"discharge_slurry\": 8.07, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 8, \"feeding_vs_percent\": 64, \"discharge_ts_percent\": 8.2, \"discharge_vs_percent\": 62}, {\"id\": 97, \"ph\": 7.2, \"ash\": 18, \"hrt\": 28, \"olr\": 2.5, \"vfa\": 2.5, \"temp\": 38, \"lignin\": 12, \"density\": 1.02, \"remarks\": null, \"entry_id\": 37, \"pressure\": 1, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"alkalinity\": 4.2, \"slurry_level\": 63.75, \"balloon_level\": 80, \"digester_name\": \"Digester 02\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0.6, \"feeding_slurry\": 8.5, \"vs_destruction\": 72, \"agitator_runtime\": null, \"discharge_slurry\": 8.07, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 8, \"feeding_vs_percent\": 64, \"discharge_ts_percent\": 8.2, \"discharge_vs_percent\": 62}, {\"id\": 98, \"ph\": 7.2, \"ash\": 18, \"hrt\": 28, \"olr\": 2.5, \"vfa\": 2.5, \"temp\": 38, \"lignin\": 12, \"density\": 1.02, \"remarks\": null, \"entry_id\": 37, \"pressure\": 1, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"alkalinity\": 4.2, \"slurry_level\": 63.75, \"balloon_level\": 80, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0.6, \"feeding_slurry\": 8.5, \"vs_destruction\": 72, \"agitator_runtime\": null, \"discharge_slurry\": 8.07, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 8, \"feeding_vs_percent\": 64, \"discharge_ts_percent\": 8.2, \"discharge_vs_percent\": 62}], \"rawBiogas\": {\"id\": 32, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"gas_yield\": 0.3, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"rbg_flared\": 42.5, \"digester_01_gas\": 1190, \"digester_02_gas\": 1207, \"digester_03_gas\": 1173, \"total_raw_biogas\": 3570}, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"utilities\": {\"id\": 32, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"electricity_consumption\": 357, \"specific_power_consumption\": 0.47}, \"created_by\": 1, \"fertilizer\": {\"id\": 32, \"sold\": 2.13, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"inventory\": 6.8, \"revenue_1\": 10200, \"revenue_2\": 680, \"revenue_3\": 1700, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"fom_produced\": 2.72, \"loose_fom_sold\": 0.43, \"weighted_average\": 4.5, \"lagoon_liquid_sold\": 0.85}, \"slsMachine\": {\"id\": 32, \"entry_id\": 37, \"solution\": 6.8, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"liquid_ts\": 2, \"liquid_vs\": 15, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"slurry_feed\": 21.25, \"wet_cake_ts\": 28, \"wet_cake_vs\": 70, \"wet_cake_prod\": 3.83, \"liquid_produced\": 15.3, \"poly_electrolyte\": 10.2, \"water_consumption\": 4.25, \"liquid_sent_to_lagoon\": 13.6}, \"compressors\": {\"id\": 32, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"total_hours\": 32.3, \"compressor_1_hours\": 17, \"compressor_2_hours\": 15.3}, \"rawMaterials\": {\"id\": 33, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"audit_note\": \"Seed data 2026-01-31\", \"cow_dung_stock\": 6.8, \"press_mud_used\": 5.1, \"cow_dung_purchased\": 10.2, \"total_press_mud_stock\": 8.5, \"new_press_mud_purchased\": 1.7, \"old_press_mud_purchased\": 2.55, \"old_press_mud_closing_stock\": 3.83, \"old_press_mud_opening_balance\": 4.25, \"old_press_mud_degradation_loss\": 0.17}, \"feedMixingTank\": {\"id\": 32, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"slurry_ph\": 7.2, \"slurry_ts\": 8, \"slurry_vs\": 62, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"water_qty\": 10.2, \"cow_dung_ts\": 8.5, \"cow_dung_vs\": 65, \"permeate_ts\": 7, \"permeate_vs\": 55, \"pressmud_ts\": 9, \"pressmud_vs\": 60, \"cow_dung_qty\": 12.75, \"permeate_qty\": 1.7, \"pressmud_qty\": 3.4, \"slurry_total\": 27.2}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 32, \"n2\": 0.8, \"o2\": 0.2, \"ch4\": 92, \"co2\": 2, \"h2s\": 5, \"cbg_sold\": 612, \"entry_id\": 37, \"produced\": 722.5, \"cbg_stock\": 102, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"ch4_slippage\": 2.5, \"conversion_ratio\": 0.76}, \"rawBiogasQuality\": {\"id\": 32, \"n2\": 6, \"o2\": 0.5, \"ch4\": 55, \"co2\": 38, \"h2s\": 72, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\"}, \"plantAvailability\": {\"id\": 32, \"entry_id\": 37, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"working_hours\": 24, \"scheduled_downtime\": 0, \"total_availability\": 83.3, \"unscheduled_downtime\": 0.43}}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 04:27:54','2026-02-09 04:27:54'),(27,4,'DELETE_MIS_ENTRY','MISDailyEntry','39','{\"id\": 39, \"date\": \"2026-02-20\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T17:00:47.000Z\", \"updatedAt\": \"2026-02-07T17:00:47.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 04:34:05','2026-02-09 04:34:05'),(28,4,'CREATE_USER','User','6',NULL,'{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 09:46:50','2026-02-09 09:46:50'),(29,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-09T09:46:50.000Z\"}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 09:49:15','2026-02-09 09:49:15'),(30,4,'UPDATE_MIS_ENTRY','MISDailyEntry','36','{\"id\": 36, \"hse\": {\"id\": 31, \"mti\": 0, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-01-30\", \"shift\": \"General\", \"status\": \"draft\", \"manpower\": {\"id\": 31, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"refex_srel_staff\": 12, \"third_party_staff\": 5}, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"digesters\": [{\"id\": 93, \"ph\": 7.2, \"ash\": 18, \"hrt\": 28, \"olr\": 2.5, \"vfa\": 2.5, \"temp\": 38, \"lignin\": 12, \"density\": 1.02, \"remarks\": null, \"entry_id\": 36, \"pressure\": 1.08, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"alkalinity\": 4.2, \"slurry_level\": 81.75, \"balloon_level\": 80, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0.6, \"feeding_slurry\": 10.9, \"vs_destruction\": 72, \"agitator_runtime\": null, \"discharge_slurry\": 10.36, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 8, \"feeding_vs_percent\": 64, \"discharge_ts_percent\": 8.2, \"discharge_vs_percent\": 62}, {\"id\": 94, \"ph\": 7.2, \"ash\": 18, \"hrt\": 28, \"olr\": 2.5, \"vfa\": 2.5, \"temp\": 38, \"lignin\": 12, \"density\": 1.02, \"remarks\": null, \"entry_id\": 36, \"pressure\": 1.08, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"alkalinity\": 4.2, \"slurry_level\": 81.75, \"balloon_level\": 80, \"digester_name\": \"Digester 02\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0.6, \"feeding_slurry\": 10.9, \"vs_destruction\": 72, \"agitator_runtime\": null, \"discharge_slurry\": 10.36, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 8, \"feeding_vs_percent\": 64, \"discharge_ts_percent\": 8.2, \"discharge_vs_percent\": 62}, {\"id\": 95, \"ph\": 7.2, \"ash\": 18, \"hrt\": 28, \"olr\": 2.5, \"vfa\": 2.5, \"temp\": 38, \"lignin\": 12, \"density\": 1.02, \"remarks\": null, \"entry_id\": 36, \"pressure\": 1.08, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"alkalinity\": 4.2, \"slurry_level\": 81.75, \"balloon_level\": 80, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0.6, \"feeding_slurry\": 10.9, \"vs_destruction\": 72, \"agitator_runtime\": null, \"discharge_slurry\": 10.36, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 8, \"feeding_vs_percent\": 64, \"discharge_ts_percent\": 8.2, \"discharge_vs_percent\": 62}], \"rawBiogas\": {\"id\": 31, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"gas_yield\": 0.33, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"rbg_flared\": 54.5, \"digester_01_gas\": 1526, \"digester_02_gas\": 1547.8, \"digester_03_gas\": 1504.2, \"total_raw_biogas\": 4578}, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"utilities\": {\"id\": 31, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"electricity_consumption\": 457.8, \"specific_power_consumption\": 0.5}, \"created_by\": 1, \"fertilizer\": {\"id\": 31, \"sold\": 2.73, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"inventory\": 8.72, \"revenue_1\": 13080, \"revenue_2\": 872, \"revenue_3\": 2180, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"fom_produced\": 3.49, \"loose_fom_sold\": 0.55, \"weighted_average\": 4.5, \"lagoon_liquid_sold\": 1.09}, \"slsMachine\": {\"id\": 31, \"entry_id\": 36, \"solution\": 8.72, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"liquid_ts\": 2, \"liquid_vs\": 15, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"slurry_feed\": 27.25, \"wet_cake_ts\": 28, \"wet_cake_vs\": 70, \"wet_cake_prod\": 4.91, \"liquid_produced\": 19.62, \"poly_electrolyte\": 13.08, \"water_consumption\": 5.45, \"liquid_sent_to_lagoon\": 17.44}, \"compressors\": {\"id\": 31, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"total_hours\": 41.42, \"compressor_1_hours\": 21.8, \"compressor_2_hours\": 19.62}, \"rawMaterials\": {\"id\": 32, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"audit_note\": \"Seed data 2026-01-30\", \"cow_dung_stock\": 8.72, \"press_mud_used\": 6.54, \"cow_dung_purchased\": 13.08, \"total_press_mud_stock\": 10.9, \"new_press_mud_purchased\": 2.18, \"old_press_mud_purchased\": 3.27, \"old_press_mud_closing_stock\": 4.91, \"old_press_mud_opening_balance\": 5.45, \"old_press_mud_degradation_loss\": 0.22}, \"feedMixingTank\": {\"id\": 31, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"slurry_ph\": 7.2, \"slurry_ts\": 8, \"slurry_vs\": 62, \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"water_qty\": 13.08, \"cow_dung_ts\": 8.5, \"cow_dung_vs\": 65, \"permeate_ts\": 7, \"permeate_vs\": 55, \"pressmud_ts\": 9, \"pressmud_vs\": 60, \"cow_dung_qty\": 16.35, \"permeate_qty\": 2.18, \"pressmud_qty\": 4.36, \"slurry_total\": 34.88}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 31, \"n2\": 0.8, \"o2\": 0.2, \"ch4\": 92, \"co2\": 2, \"h2s\": 5, \"cbg_sold\": 784.8, \"entry_id\": 36, \"produced\": 926.5, \"cbg_stock\": 130.8, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"ch4_slippage\": 2.5, \"conversion_ratio\": 0.79}, \"rawBiogasQuality\": {\"id\": 31, \"n2\": 6, \"o2\": 0.5, \"ch4\": 55, \"co2\": 38, \"h2s\": 84.8, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\"}, \"plantAvailability\": {\"id\": 31, \"entry_id\": 36, \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"working_hours\": 24, \"scheduled_downtime\": 0, \"total_availability\": 106.82, \"unscheduled_downtime\": 0.55}}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:06:16','2026-02-09 10:06:16'),(31,4,'DELETE_MIS_ENTRY','MISDailyEntry','27','{\"id\": 27, \"date\": \"2026-01-21\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:20','2026-02-09 10:54:20'),(32,4,'DELETE_MIS_ENTRY','MISDailyEntry','26','{\"id\": 26, \"date\": \"2026-01-20\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:20','2026-02-09 10:54:20'),(33,4,'DELETE_MIS_ENTRY','MISDailyEntry','23','{\"id\": 23, \"date\": \"2026-01-17\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:30','2026-02-09 10:54:30'),(34,4,'DELETE_MIS_ENTRY','MISDailyEntry','20','{\"id\": 20, \"date\": \"2026-01-14\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:30','2026-02-09 10:54:30'),(35,4,'DELETE_MIS_ENTRY','MISDailyEntry','18','{\"id\": 18, \"date\": \"2026-01-12\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:30','2026-02-09 10:54:30'),(36,4,'DELETE_MIS_ENTRY','MISDailyEntry','21','{\"id\": 21, \"date\": \"2026-01-15\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:30','2026-02-09 10:54:30'),(37,4,'DELETE_MIS_ENTRY','MISDailyEntry','19','{\"id\": 19, \"date\": \"2026-01-13\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:30','2026-02-09 10:54:30'),(38,4,'DELETE_MIS_ENTRY','MISDailyEntry','22','{\"id\": 22, \"date\": \"2026-01-16\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:54:30','2026-02-09 10:54:30'),(39,4,'DELETE_MIS_ENTRY','MISDailyEntry','37','{\"id\": 37, \"date\": \"2026-01-31\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-09T04:27:53.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(40,4,'DELETE_MIS_ENTRY','MISDailyEntry','34','{\"id\": 34, \"date\": \"2026-01-28\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(41,4,'DELETE_MIS_ENTRY','MISDailyEntry','33','{\"id\": 33, \"date\": \"2026-01-27\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(42,4,'DELETE_MIS_ENTRY','MISDailyEntry','24','{\"id\": 24, \"date\": \"2026-01-18\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(43,4,'DELETE_MIS_ENTRY','MISDailyEntry','30','{\"id\": 30, \"date\": \"2026-01-24\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(44,4,'DELETE_MIS_ENTRY','MISDailyEntry','25','{\"id\": 25, \"date\": \"2026-01-19\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(45,4,'DELETE_MIS_ENTRY','MISDailyEntry','17','{\"id\": 17, \"date\": \"2026-01-11\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(46,4,'DELETE_MIS_ENTRY','MISDailyEntry','16','{\"id\": 16, \"date\": \"2026-01-10\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(47,4,'DELETE_MIS_ENTRY','MISDailyEntry','15','{\"id\": 15, \"date\": \"2026-01-09\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(48,4,'DELETE_MIS_ENTRY','MISDailyEntry','14','{\"id\": 14, \"date\": \"2026-01-08\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(49,4,'DELETE_MIS_ENTRY','MISDailyEntry','13','{\"id\": 13, \"date\": \"2026-01-07\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(50,4,'DELETE_MIS_ENTRY','MISDailyEntry','12','{\"id\": 12, \"date\": \"2026-01-06\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:24.000Z\", \"updatedAt\": \"2026-02-07T07:59:24.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:02','2026-02-09 10:55:02'),(51,4,'DELETE_MIS_ENTRY','MISDailyEntry','11','{\"id\": 11, \"date\": \"2026-01-05\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:24.000Z\", \"updatedAt\": \"2026-02-07T07:59:24.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:03','2026-02-09 10:55:03'),(52,4,'DELETE_MIS_ENTRY','MISDailyEntry','10','{\"id\": 10, \"date\": \"2026-01-04\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:24.000Z\", \"updatedAt\": \"2026-02-07T07:59:24.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:03','2026-02-09 10:55:03'),(53,4,'DELETE_MIS_ENTRY','MISDailyEntry','8','{\"id\": 8, \"date\": \"2026-01-02\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:24.000Z\", \"updatedAt\": \"2026-02-07T07:59:24.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:03','2026-02-09 10:55:03'),(54,4,'DELETE_MIS_ENTRY','MISDailyEntry','9','{\"id\": 9, \"date\": \"2026-01-03\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:24.000Z\", \"updatedAt\": \"2026-02-07T07:59:24.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:03','2026-02-09 10:55:03'),(55,4,'DELETE_MIS_ENTRY','MISDailyEntry','7','{\"id\": 7, \"date\": \"2026-01-01\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:24.000Z\", \"updatedAt\": \"2026-02-07T07:59:24.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-09 10:55:03','2026-02-09 10:55:03'),(56,4,'DELETE_MIS_ENTRY','MISDailyEntry','58','{\"id\": 58, \"date\": \"2026-03-10\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(57,4,'DELETE_MIS_ENTRY','MISDailyEntry','57','{\"id\": 57, \"date\": \"2026-03-09\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(58,4,'DELETE_MIS_ENTRY','MISDailyEntry','56','{\"id\": 56, \"date\": \"2026-03-08\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(59,4,'DELETE_MIS_ENTRY','MISDailyEntry','55','{\"id\": 55, \"date\": \"2026-03-07\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(60,4,'DELETE_MIS_ENTRY','MISDailyEntry','54','{\"id\": 54, \"date\": \"2026-03-06\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(61,4,'DELETE_MIS_ENTRY','MISDailyEntry','53','{\"id\": 53, \"date\": \"2026-03-05\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(62,4,'DELETE_MIS_ENTRY','MISDailyEntry','52','{\"id\": 52, \"date\": \"2026-03-04\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(63,4,'DELETE_MIS_ENTRY','MISDailyEntry','51','{\"id\": 51, \"date\": \"2026-03-03\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(64,4,'DELETE_MIS_ENTRY','MISDailyEntry','50','{\"id\": 50, \"date\": \"2026-03-02\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(65,4,'DELETE_MIS_ENTRY','MISDailyEntry','49','{\"id\": 49, \"date\": \"2026-03-01\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:07.000Z\", \"updatedAt\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(66,4,'DELETE_MIS_ENTRY','MISDailyEntry','48','{\"id\": 48, \"date\": \"2026-02-28\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:00.000Z\", \"updatedAt\": \"2026-02-11T09:31:00.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(67,4,'DELETE_MIS_ENTRY','MISDailyEntry','47','{\"id\": 47, \"date\": \"2026-02-27\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:31:00.000Z\", \"updatedAt\": \"2026-02-11T09:31:00.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(68,4,'DELETE_MIS_ENTRY','MISDailyEntry','46','{\"id\": 46, \"date\": \"2026-02-26\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:30:59.000Z\", \"updatedAt\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(69,4,'DELETE_MIS_ENTRY','MISDailyEntry','45','{\"id\": 45, \"date\": \"2026-02-25\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:30:59.000Z\", \"updatedAt\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(70,4,'DELETE_MIS_ENTRY','MISDailyEntry','44','{\"id\": 44, \"date\": \"2026-02-24\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:30:59.000Z\", \"updatedAt\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(71,4,'DELETE_MIS_ENTRY','MISDailyEntry','43','{\"id\": 43, \"date\": \"2026-02-23\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:30:59.000Z\", \"updatedAt\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(72,4,'DELETE_MIS_ENTRY','MISDailyEntry','42','{\"id\": 42, \"date\": \"2026-02-22\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:30:59.000Z\", \"updatedAt\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(73,4,'DELETE_MIS_ENTRY','MISDailyEntry','41','{\"id\": 41, \"date\": \"2026-02-21\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-11T09:30:59.000Z\", \"updatedAt\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(74,4,'DELETE_MIS_ENTRY','MISDailyEntry','36','{\"id\": 36, \"date\": \"2026-01-30\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(75,4,'DELETE_MIS_ENTRY','MISDailyEntry','35','{\"id\": 35, \"date\": \"2026-01-29\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(76,4,'DELETE_MIS_ENTRY','MISDailyEntry','32','{\"id\": 32, \"date\": \"2026-01-26\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(77,4,'DELETE_MIS_ENTRY','MISDailyEntry','31','{\"id\": 31, \"date\": \"2026-01-25\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(78,4,'DELETE_MIS_ENTRY','MISDailyEntry','29','{\"id\": 29, \"date\": \"2026-01-23\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(79,4,'DELETE_MIS_ENTRY','MISDailyEntry','28','{\"id\": 28, \"date\": \"2026-01-22\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-07T07:59:25.000Z\", \"updatedAt\": \"2026-02-07T07:59:25.000Z\", \"created_by\": 1, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 05:12:44','2026-02-13 05:12:44'),(80,4,'CREATE_MIS_ENTRY','MISDailyEntry','78',NULL,'{\"id\": 78, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-13T06:12:16.299Z\", \"updatedAt\": \"2026-02-13T06:12:16.299Z\", \"created_by\": 4, \"review_comment\": null}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:12:16','2026-02-13 06:12:16'),(81,4,'DELETE_MIS_ENTRY','MISDailyEntry','78','{\"id\": 78, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-13T06:12:16.000Z\", \"updatedAt\": \"2026-02-13T06:12:16.000Z\", \"created_by\": 4, \"deleted_at\": null, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:12:25','2026-02-13 06:12:25'),(82,4,'CREATE_MIS_ENTRY','MISDailyEntry','79',NULL,'{\"id\": 79, \"date\": \"2025-12-10\", \"shift\": \"General\", \"status\": \"draft\", \"created_at\": \"2026-02-13T06:27:54.123Z\", \"created_by\": 4, \"updated_at\": \"2026-02-13T06:27:54.123Z\", \"review_comment\": null}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:27:54','2026-02-13 06:27:54'),(83,4,'DELETE_MIS_ENTRY','MISDailyEntry','58','{\"id\": 58, \"date\": \"2026-03-10\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:04','2026-02-13 06:43:04'),(84,4,'DELETE_MIS_ENTRY','MISDailyEntry','57','{\"id\": 57, \"date\": \"2026-03-09\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:06','2026-02-13 06:43:06'),(85,4,'DELETE_MIS_ENTRY','MISDailyEntry','56','{\"id\": 56, \"date\": \"2026-03-08\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:08','2026-02-13 06:43:08'),(86,4,'DELETE_MIS_ENTRY','MISDailyEntry','54','{\"id\": 54, \"date\": \"2026-03-06\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(87,4,'DELETE_MIS_ENTRY','MISDailyEntry','55','{\"id\": 55, \"date\": \"2026-03-07\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(88,4,'DELETE_MIS_ENTRY','MISDailyEntry','53','{\"id\": 53, \"date\": \"2026-03-05\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(89,4,'DELETE_MIS_ENTRY','MISDailyEntry','52','{\"id\": 52, \"date\": \"2026-03-04\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(90,4,'DELETE_MIS_ENTRY','MISDailyEntry','51','{\"id\": 51, \"date\": \"2026-03-03\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(91,4,'DELETE_MIS_ENTRY','MISDailyEntry','50','{\"id\": 50, \"date\": \"2026-03-02\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(92,4,'DELETE_MIS_ENTRY','MISDailyEntry','49','{\"id\": 49, \"date\": \"2026-03-01\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:07.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(93,4,'DELETE_MIS_ENTRY','MISDailyEntry','48','{\"id\": 48, \"date\": \"2026-02-28\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:00.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(94,4,'DELETE_MIS_ENTRY','MISDailyEntry','47','{\"id\": 47, \"date\": \"2026-02-27\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:31:00.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:43:18','2026-02-13 06:43:18'),(95,4,'DELETE_MIS_ENTRY','MISDailyEntry','42','{\"id\": 42, \"date\": \"2026-02-22\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:44:18','2026-02-13 06:44:18'),(96,4,'DELETE_MIS_ENTRY','MISDailyEntry','39','{\"id\": 39, \"date\": \"2026-02-20\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-07T17:00:47.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-09T04:34:05.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:44:18','2026-02-13 06:44:18'),(97,4,'DELETE_MIS_ENTRY','MISDailyEntry','6','{\"id\": 6, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-07T07:21:41.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-07T13:05:52.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:44:18','2026-02-13 06:44:18'),(98,4,'DELETE_MIS_ENTRY','MISDailyEntry','43','{\"id\": 43, \"date\": \"2026-02-23\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:44:18','2026-02-13 06:44:18'),(99,4,'DELETE_MIS_ENTRY','MISDailyEntry','41','{\"id\": 41, \"date\": \"2026-02-21\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-11T09:30:59.000Z\", \"created_by\": 4, \"deleted_at\": null, \"updated_at\": \"2026-02-13T05:12:44.000Z\", \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:44:18','2026-02-13 06:44:18'),(100,4,'DELETE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"deleted\", \"created_at\": \"2026-02-07T04:50:00.000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-07T13:05:57.000Z\", \"review_comment\": \"Updated integration test entry\"}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 06:44:18','2026-02-13 06:44:18'),(101,4,'CREATE_MIS_ENTRY','MISDailyEntry','1',NULL,'{\"id\": 1, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-13T07:06:42.159Z\", \"updatedAt\": \"2026-02-13T07:06:42.159Z\", \"created_by\": 4, \"review_comment\": null}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 07:06:42','2026-02-13 07:06:42'),(102,4,'DELETE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-13T07:06:42.000Z\", \"updatedAt\": \"2026-02-13T07:06:42.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 07:06:49','2026-02-13 07:06:49'),(103,4,'CREATE_MIS_ENTRY','MISDailyEntry','1',NULL,'{\"id\": 1, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-13T09:32:08.862Z\", \"updatedAt\": \"2026-02-13T09:32:08.862Z\", \"created_by\": 4, \"review_comment\": null}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 09:32:09','2026-02-13 09:32:09'),(104,4,'CREATE_USER','User','7',NULL,'{\"name\": \"Saravanan\", \"email\": \"saravanan.v@refex.co.in\", \"role_id\": 3}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 11:46:13','2026-02-13 11:46:13'),(105,4,'CREATE_USER','User','8',NULL,'{\"name\": \"Kalpesh\", \"email\": \"kalpesh.k@refex.co.in\", \"role_id\": 3}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 11:47:09','2026-02-13 11:47:09'),(106,4,'CREATE_USER','User','9',NULL,'{\"name\": \"Ramesh\", \"email\": \"ramesh.c@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 11:48:10','2026-02-13 11:48:10'),(107,4,'CREATE_USER','User','10',NULL,'{\"name\": \"Rohan DK\", \"email\": \"rohan.dk@refex.co.in\", \"role_id\": 3}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 11:49:16','2026-02-13 11:49:16'),(108,4,'CREATE_USER','User','11',NULL,'{\"name\": \"Abhilash AG\", \"email\": \"abhilash.ag@refex.co.in\", \"role_id\": 3}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 11:50:09','2026-02-13 11:50:09'),(109,4,'CREATE_USER','User','12',NULL,'{\"name\": \"Abdul Naim\", \"email\": \"abdul.naim@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-13 11:51:06','2026-02-13 11:51:06'),(110,4,'CREATE_MIS_ENTRY','MISDailyEntry','1',NULL,'{\"id\": 1, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-16T05:40:35.920Z\", \"updatedAt\": \"2026-02-16T05:40:35.920Z\", \"created_by\": 4, \"review_comment\": null}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-16 05:40:36','2026-02-16 05:40:36'),(111,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 1, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 2, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 02\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 3, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"rbg_flared\": 0, \"digester_01_gas\": 0, \"digester_02_gas\": 0, \"digester_03_gas\": 0, \"total_raw_biogas\": 0}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 0, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 0, \"press_mud_used\": 0, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 0, \"new_press_mud_purchased\": 0, \"old_press_mud_purchased\": 0, \"old_press_mud_closing_stock\": 0, \"old_press_mud_opening_balance\": 0, \"old_press_mud_degradation_loss\": 0}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 0, \"slurry_ts\": 0, \"slurry_vs\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"water_qty\": 0, \"cow_dung_ts\": 0, \"cow_dung_vs\": 0, \"permeate_ts\": 0, \"permeate_vs\": 0, \"pressmud_ts\": 0, \"pressmud_vs\": 0, \"cow_dung_qty\": 0, \"permeate_qty\": 0, \"pressmud_qty\": 0, \"slurry_total\": 0}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 0, \"cbg_sold\": 0, \"entry_id\": 1, \"produced\": 0, \"cbg_stock\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"ch4_slippage\": 0, \"conversion_ratio\": 0}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-16 05:40:52','2026-02-16 05:40:52'),(112,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 4, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:40:52.000Z\", \"updatedAt\": \"2026-02-16T05:40:52.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 5, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:40:52.000Z\", \"updatedAt\": \"2026-02-16T05:40:52.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 02\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 6, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:40:52.000Z\", \"updatedAt\": \"2026-02-16T05:40:52.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"rbg_flared\": 0, \"digester_01_gas\": 0, \"digester_02_gas\": 0, \"digester_03_gas\": 0, \"total_raw_biogas\": 0}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 0, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:52.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 98.015, \"press_mud_used\": 0, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 0, \"new_press_mud_purchased\": 0, \"old_press_mud_purchased\": 98.015, \"old_press_mud_closing_stock\": 98.015, \"old_press_mud_opening_balance\": 98.015, \"old_press_mud_degradation_loss\": 98.015}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 0, \"slurry_ts\": 0, \"slurry_vs\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"water_qty\": 0, \"cow_dung_ts\": 0, \"cow_dung_vs\": 0, \"permeate_ts\": 0, \"permeate_vs\": 0, \"pressmud_ts\": 0, \"pressmud_vs\": 0, \"cow_dung_qty\": 0, \"permeate_qty\": 0, \"pressmud_qty\": 0, \"slurry_total\": 0}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 0, \"cbg_sold\": 0, \"entry_id\": 1, \"produced\": 0, \"cbg_stock\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"ch4_slippage\": 0, \"conversion_ratio\": 0}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-16 05:42:27','2026-02-16 05:42:27'),(113,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 7, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-16T05:42:27.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 01\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 8, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-16T05:42:27.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 02\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 9, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-16T05:42:27.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"rbg_flared\": 0, \"digester_01_gas\": 0, \"digester_02_gas\": 0, \"digester_03_gas\": 0, \"total_raw_biogas\": 0}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 0, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 98.015, \"press_mud_used\": 98.015, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 98.015, \"new_press_mud_purchased\": 98.015, \"old_press_mud_purchased\": 98.015, \"old_press_mud_closing_stock\": 98.015, \"old_press_mud_opening_balance\": 98.015, \"old_press_mud_degradation_loss\": 98.015}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 98.015, \"slurry_ts\": 98.015, \"slurry_vs\": 98.015, \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"water_qty\": 98.015, \"cow_dung_ts\": 98.015, \"cow_dung_vs\": 98.015, \"permeate_ts\": 98.015, \"permeate_vs\": 98.015, \"pressmud_ts\": 98.015, \"pressmud_vs\": 98.015, \"cow_dung_qty\": 98.015, \"permeate_qty\": 98.015, \"pressmud_qty\": 98.015, \"slurry_total\": 98.015}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 0, \"cbg_sold\": 0, \"entry_id\": 1, \"produced\": 0, \"cbg_stock\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"ch4_slippage\": 0, \"conversion_ratio\": 0}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-17 12:16:46','2026-02-17 12:16:46'),(114,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"cbgSales\": [], \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 10, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T12:16:46.000Z\", \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 01\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 11, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T12:16:46.000Z\", \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 02\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 12, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 98.015, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-17T12:16:46.000Z\", \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 98.015, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 98.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"rbg_flared\": 98.015, \"digester_01_gas\": 98.015, \"digester_02_gas\": 98.015, \"digester_03_gas\": 98.015, \"total_raw_biogas\": 99.015}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 98.015, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 98.015, \"press_mud_used\": 98.015, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 98.015, \"new_press_mud_purchased\": 98.015, \"old_press_mud_purchased\": 98.015, \"old_press_mud_closing_stock\": 98.015, \"old_press_mud_opening_balance\": 98.015, \"old_press_mud_degradation_loss\": 98.015}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 98.015, \"slurry_ts\": 98.015, \"slurry_vs\": 97.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"water_qty\": 98.015, \"cow_dung_ts\": 98.015, \"cow_dung_vs\": 98.015, \"permeate_ts\": 98.015, \"permeate_vs\": 98.015, \"pressmud_ts\": 98.015, \"pressmud_vs\": 98.015, \"cow_dung_qty\": 98.015, \"permeate_qty\": 98.015, \"pressmud_qty\": 98.015, \"slurry_total\": 98.015}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 98.015, \"o2\": 98.015, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 98.015, \"cbg_sold\": 0, \"entry_id\": 1, \"produced\": 980.015, \"cbg_stock\": 98.015, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"ch4_slippage\": 98.015, \"conversion_ratio\": 100.015}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-17 16:42:40','2026-02-17 16:42:40'),(115,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"cbgSales\": [{\"id\": 1, \"entry_id\": 1, \"quantity\": 8, \"createdAt\": \"2026-02-17T16:42:40.000Z\", \"updatedAt\": \"2026-02-17T16:42:40.000Z\", \"customer_id\": 1}, {\"id\": 2, \"entry_id\": 1, \"quantity\": 6, \"createdAt\": \"2026-02-17T16:42:40.000Z\", \"updatedAt\": \"2026-02-17T16:42:40.000Z\", \"customer_id\": 1}, {\"id\": 3, \"entry_id\": 1, \"quantity\": 3, \"createdAt\": \"2026-02-17T16:42:40.000Z\", \"updatedAt\": \"2026-02-17T16:42:40.000Z\", \"customer_id\": 1}], \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 22, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T16:42:39.000Z\", \"updatedAt\": \"2026-02-17T16:42:39.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 01\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 23, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T16:42:39.000Z\", \"updatedAt\": \"2026-02-17T16:42:39.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 02\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 24, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 98.015, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-17T16:42:39.000Z\", \"updatedAt\": \"2026-02-17T16:42:39.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 98.015, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 98.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"rbg_flared\": 98.015, \"digester_01_gas\": 98.015, \"digester_02_gas\": 98.015, \"digester_03_gas\": 98.015, \"total_raw_biogas\": 99.015}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 98.015, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 98.015, \"press_mud_used\": 98.015, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 98.015, \"new_press_mud_purchased\": 98.015, \"old_press_mud_purchased\": 98.015, \"old_press_mud_closing_stock\": 98.015, \"old_press_mud_opening_balance\": 98.015, \"old_press_mud_degradation_loss\": 98.015}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 98.015, \"slurry_ts\": 98.015, \"slurry_vs\": 97.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"water_qty\": 98.015, \"cow_dung_ts\": 98.015, \"cow_dung_vs\": 98.015, \"permeate_ts\": 98.015, \"permeate_vs\": 98.015, \"pressmud_ts\": 98.015, \"pressmud_vs\": 98.015, \"cow_dung_qty\": 98.015, \"permeate_qty\": 98.015, \"pressmud_qty\": 98.015, \"slurry_total\": 98.015}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 98.015, \"o2\": 98.015, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 98.015, \"cbg_sold\": 8, \"entry_id\": 1, \"produced\": 980.015, \"cbg_stock\": 98.015, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-17T16:42:40.000Z\", \"ch4_slippage\": 98.015, \"conversion_ratio\": 100.015}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-17 16:42:58','2026-02-17 16:42:58'),(116,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"cbgSales\": [{\"id\": 4, \"entry_id\": 1, \"quantity\": 8, \"createdAt\": \"2026-02-17T16:42:58.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"customer_id\": 1}, {\"id\": 5, \"entry_id\": 1, \"quantity\": 6, \"createdAt\": \"2026-02-17T16:42:58.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"customer_id\": 1}], \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 25, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T16:42:58.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 01\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 26, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T16:42:58.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 02\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 27, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 98.015, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-17T16:42:58.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 98.015, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 98.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"rbg_flared\": 98.015, \"digester_01_gas\": 98.015, \"digester_02_gas\": 98.015, \"digester_03_gas\": 98.015, \"total_raw_biogas\": 99.015}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 98.015, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 98.015, \"press_mud_used\": 98.015, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 98.015, \"new_press_mud_purchased\": 98.015, \"old_press_mud_purchased\": 98.015, \"old_press_mud_closing_stock\": 98.015, \"old_press_mud_opening_balance\": 98.015, \"old_press_mud_degradation_loss\": 98.015}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 98.015, \"slurry_ts\": 98.015, \"slurry_vs\": 97.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"water_qty\": 98.015, \"cow_dung_ts\": 98.015, \"cow_dung_vs\": 98.015, \"permeate_ts\": 98.015, \"permeate_vs\": 98.015, \"pressmud_ts\": 98.015, \"pressmud_vs\": 98.015, \"cow_dung_qty\": 98.015, \"permeate_qty\": 98.015, \"pressmud_qty\": 98.015, \"slurry_total\": 98.015}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 98.015, \"o2\": 98.015, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 98.015, \"cbg_sold\": 14, \"entry_id\": 1, \"produced\": 980.015, \"cbg_stock\": 98.015, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"ch4_slippage\": 98.015, \"conversion_ratio\": 100.015}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-17 17:05:20','2026-02-17 17:05:20'),(117,4,'UPDATE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"hse\": {\"id\": 1, \"mti\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"cbgSales\": [{\"id\": 6, \"entry_id\": 1, \"quantity\": 8, \"createdAt\": \"2026-02-17T17:05:20.000Z\", \"updatedAt\": \"2026-02-17T17:05:20.000Z\", \"customer_id\": 1}, {\"id\": 7, \"entry_id\": 1, \"quantity\": 6, \"createdAt\": \"2026-02-17T17:05:20.000Z\", \"updatedAt\": \"2026-02-17T17:05:20.000Z\", \"customer_id\": 2}], \"manpower\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"digesters\": [{\"id\": 28, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T17:05:20.000Z\", \"updatedAt\": \"2026-02-17T17:05:20.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 01\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 29, \"ph\": 98.015, \"ash\": 98.015, \"hrt\": 98.015, \"olr\": 98.015, \"vfa\": 98.015, \"temp\": 98.015, \"lignin\": 98.015, \"density\": 98.015, \"remarks\": null, \"entry_id\": 1, \"pressure\": 98.015, \"createdAt\": \"2026-02-17T17:05:20.000Z\", \"updatedAt\": \"2026-02-17T17:05:20.000Z\", \"alkalinity\": 98.015, \"slurry_level\": 98.015, \"balloon_level\": 98.015, \"digester_name\": \"Digester 02\", \"foaming_level\": 98.015, \"vfa_alk_ratio\": 98.015, \"feeding_slurry\": 98.015, \"vs_destruction\": 98.015, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}, {\"id\": 30, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 98.015, \"density\": 0, \"remarks\": null, \"entry_id\": 1, \"pressure\": 0, \"createdAt\": \"2026-02-17T17:05:20.000Z\", \"updatedAt\": \"2026-02-17T17:05:20.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 98.015, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 98.015, \"agitator_condition\": \"OK\", \"feeding_ts_percent\": 98.015, \"feeding_vs_percent\": 98.015, \"discharge_ts_percent\": 98.015, \"discharge_vs_percent\": 98.015}], \"rawBiogas\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"gas_yield\": 98.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"rbg_flared\": 98.015, \"digester_01_gas\": 98.015, \"digester_02_gas\": 98.015, \"digester_03_gas\": 98.015, \"total_raw_biogas\": 99.015}, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"utilities\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"electricity_consumption\": 0, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 1, \"sold\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"fom_produced\": 0, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 1, \"entry_id\": 1, \"solution\": 0, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 98.015, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:42:27.000Z\", \"audit_note\": \"\", \"cow_dung_stock\": 98.015, \"press_mud_used\": 98.015, \"cow_dung_purchased\": 98.015, \"total_press_mud_stock\": 98.015, \"new_press_mud_purchased\": 98.015, \"old_press_mud_purchased\": 98.015, \"old_press_mud_closing_stock\": 98.015, \"old_press_mud_opening_balance\": 98.015, \"old_press_mud_degradation_loss\": 98.015}, \"feedMixingTank\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"slurry_ph\": 98.015, \"slurry_ts\": 98.015, \"slurry_vs\": 97.015, \"updatedAt\": \"2026-02-17T12:16:46.000Z\", \"water_qty\": 98.015, \"cow_dung_ts\": 98.015, \"cow_dung_vs\": 98.015, \"permeate_ts\": 98.015, \"permeate_vs\": 98.015, \"pressmud_ts\": 98.015, \"pressmud_vs\": 98.015, \"cow_dung_qty\": 98.015, \"permeate_qty\": 98.015, \"pressmud_qty\": 98.015, \"slurry_total\": 98.015}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 1, \"n2\": 98.015, \"o2\": 98.015, \"ch4\": 95.015, \"co2\": 0, \"h2s\": 98.015, \"cbg_sold\": 14, \"entry_id\": 1, \"produced\": 980.015, \"cbg_stock\": 98.015, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-17T16:42:58.000Z\", \"ch4_slippage\": 98.015, \"conversion_ratio\": 100.015}, \"rawBiogasQuality\": {\"id\": 1, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\"}, \"plantAvailability\": {\"id\": 1, \"entry_id\": 1, \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"working_hours\": 0, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-18 08:37:31','2026-02-18 08:37:31'),(118,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-09T09:46:50.000Z\"}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 07:21:18','2026-02-19 07:21:18'),(119,4,'UPDATE_USER','User','7','{\"id\": 7, \"name\": \"Saravanan\", \"email\": \"saravanan.v@refex.co.in\", \"role_id\": 3, \"password\": \"$2b$10$uqyjsuQkVYqu4h7KdR7QJOm3tL3ioWc/SPZB1aaqFk8B59KRxSd9G\", \"createdAt\": \"2026-02-13T11:46:13.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-13T11:46:13.000Z\"}','{\"name\": \"Saravanan\", \"email\": \"saravanan.v@refex.co.in\", \"role_id\": 3}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 07:21:27','2026-02-19 07:21:27'),(120,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-09T09:46:50.000Z\"}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 07:24:15','2026-02-19 07:24:15'),(121,4,'UPDATE_USER','User','7','{\"id\": 7, \"name\": \"Saravanan\", \"email\": \"saravanan.v@refex.co.in\", \"role_id\": 3, \"password\": \"$2b$10$uqyjsuQkVYqu4h7KdR7QJOm3tL3ioWc/SPZB1aaqFk8B59KRxSd9G\", \"createdAt\": \"2026-02-13T11:46:13.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-13T11:46:13.000Z\"}','{\"name\": \"Saravanan\", \"email\": \"saravanan.v@refex.co.in\", \"role_id\": 3}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 07:25:55','2026-02-19 07:25:55'),(122,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-09T09:46:50.000Z\"}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 07:32:36','2026-02-19 07:32:36'),(123,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-09T09:46:50.000Z\"}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 07:32:47','2026-02-19 07:32:47'),(124,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-09T09:46:50.000Z\", \"is_custom_perm\": false}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 09:00:06','2026-02-19 09:00:06'),(125,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 09:29:41','2026-02-19 09:29:41'),(126,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 09:32:12','2026-02-19 09:32:12'),(127,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 09:32:28','2026-02-19 09:32:28'),(128,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 10:28:21','2026-02-19 10:28:21'),(129,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 10:28:28','2026-02-19 10:28:28'),(130,4,'UPDATE_USER','User','12','{\"id\": 12, \"name\": \"Abdul Naim\", \"email\": \"abdul.naim@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$NphCfx07KlT53jOivgTkB.l.zr/LjtzZ1Lb7Nwy19CyX8T6hwG.a2\", \"createdAt\": \"2026-02-13T11:51:06.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-13T11:51:06.000Z\", \"is_custom_perm\": false}','{\"name\": \"Abdul Naim\", \"email\": \"abdul.naim@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 10:29:23','2026-02-19 10:29:23'),(131,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 10:58:15','2026-02-19 10:58:15'),(132,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 10:59:13','2026-02-19 10:59:13'),(133,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 11:00:14','2026-02-19 11:00:14'),(134,4,'DELETE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-16T05:40:35.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:03:16','2026-02-19 12:03:16'),(135,4,'DELETE_MIS_ENTRY','MISDailyEntry','3','{\"id\": 3, \"date\": \"2026-02-15\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-17T17:22:14.000Z\", \"updatedAt\": \"2026-02-17T17:22:14.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:12:32','2026-02-19 12:12:32'),(136,4,'DELETE_MIS_ENTRY','MISDailyEntry','4','{\"id\": 4, \"date\": \"2026-02-14\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:14.000Z\", \"updatedAt\": \"2026-02-17T17:22:14.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:12:35','2026-02-19 12:12:35'),(137,4,'DELETE_MIS_ENTRY','MISDailyEntry','5','{\"id\": 5, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:12:41','2026-02-19 12:12:41'),(138,4,'DELETE_MIS_ENTRY','MISDailyEntry','6','{\"id\": 6, \"date\": \"2026-02-12\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:12:48','2026-02-19 12:12:48'),(139,4,'DELETE_MIS_ENTRY','MISDailyEntry','16','{\"id\": 16, \"date\": \"2026-02-01\", \"shift\": \"General\", \"status\": \"submitted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:12:52','2026-02-19 12:12:52'),(140,4,'UPDATE_MIS_ENTRY','MISDailyEntry','14','{\"id\": 14, \"hse\": {\"id\": 13, \"mti\": 0, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-03\", \"shift\": \"General\", \"status\": \"draft\", \"cbgSales\": [], \"manpower\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"digesters\": [{\"id\": 64, \"ph\": 0, \"ash\": null, \"hrt\": 0, \"olr\": 0, \"vfa\": null, \"temp\": 0, \"lignin\": null, \"density\": null, \"remarks\": null, \"entry_id\": 14, \"pressure\": null, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"alkalinity\": null, \"slurry_level\": null, \"balloon_level\": null, \"digester_name\": \"Digester 01\", \"foaming_level\": null, \"vfa_alk_ratio\": null, \"feeding_slurry\": 0, \"vs_destruction\": null, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 65, \"ph\": 0, \"ash\": null, \"hrt\": 0, \"olr\": 0, \"vfa\": null, \"temp\": 0, \"lignin\": null, \"density\": null, \"remarks\": null, \"entry_id\": 14, \"pressure\": null, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"alkalinity\": null, \"slurry_level\": null, \"balloon_level\": null, \"digester_name\": \"Digester 02\", \"foaming_level\": null, \"vfa_alk_ratio\": null, \"feeding_slurry\": 0, \"vs_destruction\": null, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 66, \"ph\": 0, \"ash\": null, \"hrt\": 0, \"olr\": 0, \"vfa\": null, \"temp\": 0, \"lignin\": null, \"density\": null, \"remarks\": null, \"entry_id\": 14, \"pressure\": null, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"alkalinity\": null, \"slurry_level\": null, \"balloon_level\": null, \"digester_name\": \"Digester 03\", \"foaming_level\": null, \"vfa_alk_ratio\": null, \"feeding_slurry\": 0, \"vs_destruction\": null, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"gas_yield\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"rbg_flared\": 0, \"digester_01_gas\": 0, \"digester_02_gas\": 0, \"digester_03_gas\": 0, \"total_raw_biogas\": 8415}, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"utilities\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"electricity_consumption\": 6480, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 13, \"sold\": 0, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"fom_produced\": 5.4, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 13, \"entry_id\": 14, \"solution\": 0, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 0, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"audit_note\": null, \"cow_dung_stock\": 0, \"press_mud_used\": 8095, \"cow_dung_purchased\": 0, \"total_press_mud_stock\": 0, \"new_press_mud_purchased\": 0, \"old_press_mud_purchased\": 0, \"old_press_mud_closing_stock\": 0, \"old_press_mud_opening_balance\": 0, \"old_press_mud_degradation_loss\": 0}, \"feedMixingTank\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"slurry_ph\": 0, \"slurry_ts\": 0, \"slurry_vs\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"water_qty\": 0, \"cow_dung_ts\": 0, \"cow_dung_vs\": 0, \"permeate_ts\": 0, \"permeate_vs\": 0, \"pressmud_ts\": 0, \"pressmud_vs\": 0, \"cow_dung_qty\": 0, \"permeate_qty\": 0, \"pressmud_qty\": 79, \"slurry_total\": 0}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 13, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"cbg_sold\": 0, \"entry_id\": 14, \"produced\": 3479, \"cbg_stock\": 0, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"ch4_slippage\": 0, \"conversion_ratio\": 0}, \"rawBiogasQuality\": {\"id\": 13, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\"}, \"plantAvailability\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"working_hours\": 23, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:13:00','2026-02-19 12:13:00'),(141,4,'DELETE_MIS_ENTRY','MISDailyEntry','9','{\"id\": 9, \"date\": \"2026-02-09\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:13:05','2026-02-19 12:13:05'),(142,4,'DELETE_MIS_ENTRY','MISDailyEntry','10','{\"id\": 10, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:13:08','2026-02-19 12:13:08'),(143,4,'DELETE_MIS_ENTRY','MISDailyEntry','7','{\"id\": 7, \"date\": \"2026-02-11\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:25:12','2026-02-19 12:25:12'),(144,4,'DELETE_MIS_ENTRY','MISDailyEntry','8','{\"id\": 8, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:25:15','2026-02-19 12:25:15'),(145,4,'DELETE_MIS_ENTRY','MISDailyEntry','11','{\"id\": 11, \"date\": \"2026-02-06\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:25:17','2026-02-19 12:25:17'),(146,4,'DELETE_MIS_ENTRY','MISDailyEntry','12','{\"id\": 12, \"date\": \"2026-02-05\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:25:19','2026-02-19 12:25:19'),(147,4,'DELETE_MIS_ENTRY','MISDailyEntry','13','{\"id\": 13, \"date\": \"2026-02-04\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:25:22','2026-02-19 12:25:22'),(148,4,'UPDATE_USER','User','6','{\"id\": 6, \"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2, \"password\": \"$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2\", \"createdAt\": \"2026-02-09T09:46:50.000Z\", \"is_active\": true, \"updatedAt\": \"2026-02-19T09:00:06.000Z\", \"is_custom_perm\": true}','{\"name\": \"sathish\", \"email\": \"sathishkumar.r@refex.co.in\", \"role_id\": 2}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:25:34','2026-02-19 12:25:34'),(149,4,'UPDATE_MIS_ENTRY','MISDailyEntry','14','{\"id\": 14, \"hse\": {\"id\": 13, \"mti\": 0, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"first_aid\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"fatalities\": 0, \"safety_lti\": 0, \"near_misses\": 0, \"other_incidents\": 0, \"reportable_incidents\": 0}, \"date\": \"2026-02-03\", \"shift\": \"General\", \"status\": \"draft\", \"cbgSales\": [], \"manpower\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"refex_srel_staff\": 0, \"third_party_staff\": 0}, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"digesters\": [{\"id\": 76, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 14, \"pressure\": 0, \"createdAt\": \"2026-02-19T12:13:00.000Z\", \"updatedAt\": \"2026-02-19T12:13:00.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 01\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 77, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 14, \"pressure\": 0, \"createdAt\": \"2026-02-19T12:13:00.000Z\", \"updatedAt\": \"2026-02-19T12:13:00.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 02\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}, {\"id\": 78, \"ph\": 0, \"ash\": 0, \"hrt\": 0, \"olr\": 0, \"vfa\": 0, \"temp\": 0, \"lignin\": 0, \"density\": 0, \"remarks\": null, \"entry_id\": 14, \"pressure\": 0, \"createdAt\": \"2026-02-19T12:13:00.000Z\", \"updatedAt\": \"2026-02-19T12:13:00.000Z\", \"alkalinity\": 0, \"slurry_level\": 0, \"balloon_level\": 0, \"digester_name\": \"Digester 03\", \"foaming_level\": 0, \"vfa_alk_ratio\": 0, \"feeding_slurry\": 0, \"vs_destruction\": 0, \"agitator_runtime\": null, \"discharge_slurry\": 0, \"agitator_condition\": null, \"feeding_ts_percent\": 0, \"feeding_vs_percent\": 0, \"discharge_ts_percent\": 0, \"discharge_vs_percent\": 0}], \"rawBiogas\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"gas_yield\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"rbg_flared\": 0, \"digester_01_gas\": 0, \"digester_02_gas\": 0, \"digester_03_gas\": 0, \"total_raw_biogas\": 8415}, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"utilities\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"electricity_consumption\": 6480, \"specific_power_consumption\": 0}, \"created_by\": 4, \"fertilizer\": {\"id\": 13, \"sold\": 0, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"inventory\": 0, \"revenue_1\": 0, \"revenue_2\": 0, \"revenue_3\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"fom_produced\": 5.4, \"loose_fom_sold\": 0, \"weighted_average\": 0, \"lagoon_liquid_sold\": 0}, \"slsMachine\": {\"id\": 13, \"entry_id\": 14, \"solution\": 0, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"liquid_ts\": 0, \"liquid_vs\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"slurry_feed\": 0, \"wet_cake_ts\": 0, \"wet_cake_vs\": 0, \"wet_cake_prod\": 0, \"liquid_produced\": 0, \"poly_electrolyte\": 0, \"water_consumption\": 0, \"liquid_sent_to_lagoon\": 0}, \"compressors\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"total_hours\": 0, \"compressor_1_hours\": 0, \"compressor_2_hours\": 0}, \"rawMaterials\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:13:00.000Z\", \"audit_note\": null, \"cow_dung_stock\": 2, \"press_mud_used\": 8095, \"cow_dung_purchased\": 0, \"total_press_mud_stock\": 0, \"new_press_mud_purchased\": 0, \"old_press_mud_purchased\": 0, \"old_press_mud_closing_stock\": 0, \"old_press_mud_opening_balance\": 2, \"old_press_mud_degradation_loss\": 0}, \"feedMixingTank\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"slurry_ph\": 0, \"slurry_ts\": 0, \"slurry_vs\": 0, \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"water_qty\": 0, \"cow_dung_ts\": 0, \"cow_dung_vs\": 0, \"permeate_ts\": 0, \"permeate_vs\": 0, \"pressmud_ts\": 0, \"pressmud_vs\": 0, \"cow_dung_qty\": 0, \"permeate_qty\": 0, \"pressmud_qty\": 79, \"slurry_total\": 0}, \"review_comment\": null, \"compressedBiogas\": {\"id\": 13, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"cbg_sold\": 0, \"entry_id\": 14, \"produced\": 3479, \"cbg_stock\": 0, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"ch4_slippage\": 0, \"conversion_ratio\": 0}, \"rawBiogasQuality\": {\"id\": 13, \"n2\": 0, \"o2\": 0, \"ch4\": 0, \"co2\": 0, \"h2s\": 0, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\"}, \"plantAvailability\": {\"id\": 13, \"entry_id\": 14, \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"working_hours\": 23, \"scheduled_downtime\": 0, \"total_availability\": 0, \"unscheduled_downtime\": 0}}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:46:24','2026-02-19 12:46:24'),(150,4,'APPROVE_ENTRY','MISDailyEntry','15',NULL,'{\"status\": \"approved\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:50:51','2026-02-19 12:50:51'),(151,4,'DELETE_MIS_ENTRY','MISDailyEntry','14','{\"id\": 14, \"date\": \"2026-02-03\", \"shift\": \"General\", \"status\": \"draft\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-17T17:22:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:57:36','2026-02-19 12:57:36'),(152,4,'DELETE_MIS_ENTRY','MISDailyEntry','15','{\"id\": 15, \"date\": \"2026-02-02\", \"shift\": \"General\", \"status\": \"approved\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:50:51.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 12:57:38','2026-02-19 12:57:38'),(153,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','1','{\"id\": 1, \"date\": \"2026-02-16\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-16T05:40:35.000Z\", \"updatedAt\": \"2026-02-19T12:03:16.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 13:35:24','2026-02-19 13:35:24'),(154,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','8','{\"id\": 8, \"date\": \"2026-02-10\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:25:15.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 13:35:34','2026-02-19 13:35:34'),(155,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','3','{\"id\": 3, \"date\": \"2026-02-15\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:14.000Z\", \"updatedAt\": \"2026-02-19T12:12:32.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 13:36:36','2026-02-19 13:36:36'),(156,4,'DELETE_MIS_ENTRY','MISDailyEntry','4','{\"id\": 4, \"date\": \"2026-02-14\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:14.000Z\", \"updatedAt\": \"2026-02-19T12:12:35.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 13:47:51','2026-02-19 13:47:51'),(157,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','4','{\"id\": 4, \"date\": \"2026-02-14\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:14.000Z\", \"updatedAt\": \"2026-02-19T12:12:35.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 13:49:23','2026-02-19 13:49:23'),(158,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','5','{\"id\": 5, \"date\": \"2026-02-13\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:12:41.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:10:18','2026-02-19 16:10:18'),(159,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','9','{\"id\": 9, \"date\": \"2026-02-09\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:13:05.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:10:26','2026-02-19 16:10:26'),(160,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','11','{\"id\": 11, \"date\": \"2026-02-06\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:25:17.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:10:34','2026-02-19 16:10:34'),(161,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','6','{\"id\": 6, \"date\": \"2026-02-12\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:12:48.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:10:41','2026-02-19 16:10:41'),(162,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','15','{\"id\": 15, \"date\": \"2026-02-02\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:57:38.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:10:50','2026-02-19 16:10:50'),(163,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','7','{\"id\": 7, \"date\": \"2026-02-11\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:25:12.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:10:57','2026-02-19 16:10:57'),(164,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','10','{\"id\": 10, \"date\": \"2026-02-07\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:13:08.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:11:06','2026-02-19 16:11:06'),(165,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','12','{\"id\": 12, \"date\": \"2026-02-05\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:25:19.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:11:12','2026-02-19 16:11:12'),(166,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','13','{\"id\": 13, \"date\": \"2026-02-04\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:25:22.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:11:21','2026-02-19 16:11:21'),(167,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','14','{\"id\": 14, \"date\": \"2026-02-03\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:57:36.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:11:27','2026-02-19 16:11:27'),(168,4,'HARD_DELETE_MIS_ENTRY','MISDailyEntry','16','{\"id\": 16, \"date\": \"2026-02-01\", \"shift\": \"General\", \"status\": \"deleted\", \"createdAt\": \"2026-02-17T17:22:15.000Z\", \"updatedAt\": \"2026-02-19T12:12:52.000Z\", \"created_by\": 4, \"review_comment\": null}',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-02-19 16:11:59','2026-02-19 16:11:59');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT 'Type of customer (e.g., Industrial, Commercial, Residential)',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text,
  `gst_number` varchar(255) DEFAULT NULL,
  `pan_number` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'customer 1','Commercial','raghul.je@refex.co.in','044 – 4340 5900/950','test',NULL,NULL,'active','2026-02-17 16:17:42','2026-02-19 09:38:31','2026-02-19 09:38:31'),(2,'Anil Jain','FOM','murugesh.k@refex.co.in','044 – 4340 5900/950',NULL,NULL,NULL,'active','2026-02-17 17:05:00','2026-02-19 09:38:28','2026-02-19 09:38:28'),(3,'DCU Morewadi','CBG',NULL,NULL,NULL,NULL,NULL,'active','2026-02-19 16:33:45','2026-02-19 16:33:45',NULL),(4,'Umiya Petroleum Centre','CBG',NULL,NULL,NULL,NULL,NULL,'active','2026-02-19 16:34:02','2026-02-19 16:34:02',NULL),(5,'Kamat Brothers','CBG',NULL,NULL,NULL,NULL,NULL,'active','2026-02-19 16:34:17','2026-02-19 16:34:17',NULL),(6,'RCF','FOM',NULL,NULL,NULL,NULL,NULL,'active','2026-02-19 16:34:33','2026-02-19 16:34:33',NULL),(7,'Biodhanic','FOM',NULL,NULL,NULL,NULL,NULL,'active','2026-02-19 16:34:48','2026-02-19 16:34:48',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_logs`
--

LOCK TABLES `email_logs` WRITE;
/*!40000 ALTER TABLE `email_logs` DISABLE KEYS */;
INSERT INTO `email_logs` VALUES (1,'admin@biogas.com','MIS Entry Submitted - 2026-02-10','sent',NULL,'2026-02-07 07:21:45'),(2,'raghul.je@refex.co.in','MIS Entry Submitted - 2026-02-10','sent',NULL,'2026-02-07 07:21:48'),(3,'murugesh.k@refex.co.in','MIS Entry Submitted - 2026-02-10','sent',NULL,'2026-02-07 07:21:51'),(4,'raghul.je@refex.co.in','SREL CBG Plant – Consolidated MIS Report for {{report_period}} (Test: 2026-01-07 to 2026-02-07)','sent',NULL,'2026-02-07 13:23:55'),(5,'raghul.je@refex.co.in','SREL CBG Plant – Consolidated MIS Report for {{report_period}} (Test: 2026-01-07 to 2026-02-07)','sent',NULL,'2026-02-07 13:57:26'),(6,'raghul.je@refex.co.in','SREL CBG Plant – Consolidated MIS Report (Test: 2026-01-07 to 2026-02-07)','sent',NULL,'2026-02-07 14:15:51'),(7,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-07 14:17:04'),(8,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-07 14:24:06'),(9,'murugesh.k@refex.co.in','MIS Entry Submitted - 2026-02-20','sent',NULL,'2026-02-07 17:00:54'),(10,'sathish.r@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-08 07:00:05'),(11,'raghul.je@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-08 07:00:08'),(12,'raghul.je@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-08 07:05:07'),(13,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-09 04:29:25'),(14,'sathish.r@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-09 07:00:03'),(15,'raghul.je@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-09 07:00:07'),(16,'murugesh.k@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-09 07:05:03'),(17,'murugesh.k@refex.co.in','Password reset for BioGas MIS','sent',NULL,'2026-02-09 09:42:32'),(18,'sathish.r@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-10 07:00:04'),(19,'raghul.je@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-10 07:00:07'),(20,'murugesh.k@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-10 07:05:02'),(21,'sathishkumar.r@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-10 07:05:05'),(22,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-11 09:24:07'),(23,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-11 09:58:25'),(24,'raghul.je@refex.co.in','[TEST] SREL CBG Plant – Consolidated MIS Report','sent',NULL,'2026-02-11 10:05:03'),(25,'sathish.r@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-13 05:15:04'),(26,'raghul.je@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-13 05:15:07'),(27,'murugesh.k@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-13 05:20:03'),(28,'raghul.je@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-13 05:20:06'),(29,'sathishkumar.r@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-13 05:20:09'),(30,'sathish.r@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-13 05:25:03'),(31,'raghul.je@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-13 05:25:06'),(32,'sathish.r@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-13 05:30:03'),(33,'raghul.je@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-13 05:30:06'),(34,'raghul.je@refex.co.in','Password reset for BioGas MIS','sent',NULL,'2026-02-13 11:01:46'),(35,'raghul.je@refex.co.in','Password reset for BioGas MIS','sent',NULL,'2026-02-13 11:14:05'),(36,'raghul.je@refex.co.in','Password reset for BioGas MIS','sent',NULL,'2026-02-13 11:38:51'),(37,'sathishkumar.r@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-16 06:30:03'),(38,'ramesh.c@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-16 06:30:06'),(39,'abdul.naim@refex.co.in','ESCALATION: MIS Entry Overdue for {{date}}','sent',NULL,'2026-02-16 06:30:09'),(40,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 07:30:03'),(41,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 07:30:06'),(42,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 07:30:09'),(43,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 07:30:12'),(44,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 08:30:03'),(45,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 08:30:06'),(46,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 08:30:09'),(47,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-16 08:30:12'),(48,'saravanan.v@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-18 05:30:03'),(49,'kalpesh.k@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-18 05:30:06'),(50,'rohan.dk@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-18 05:30:09'),(51,'abhilash.ag@refex.co.in','MIS Entry Missing for {{date}}','sent',NULL,'2026-02-18 05:30:12'),(52,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 08:30:04'),(53,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 08:30:08'),(54,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 08:30:11'),(55,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 08:30:15'),(56,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 09:30:04'),(57,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 09:30:07'),(58,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 09:30:10'),(59,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 09:30:13'),(60,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 10:30:04'),(61,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 10:30:07'),(62,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 10:30:11'),(63,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-18 10:30:14'),(64,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 07:30:04'),(65,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 07:30:04'),(66,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 07:30:07'),(67,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 07:30:07'),(68,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 07:30:10'),(69,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 07:30:14'),(70,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 08:30:04'),(71,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 08:30:08'),(72,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 08:30:11'),(73,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 08:30:14'),(74,'saravanan.v@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 09:30:03'),(75,'kalpesh.k@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 09:30:06'),(76,'rohan.dk@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 09:30:09'),(77,'abhilash.ag@refex.co.in','MIS Entry Pending Submission for {{date}}','sent',NULL,'2026-02-19 09:30:12'),(78,'raghul.je@refex.co.in','MIS Entry Approved - 2026-02-02','sent',NULL,'2026-02-19 12:50:54'),(79,'raghul.je@refex.co.in','Password reset for BioGas MIS','sent',NULL,'2026-02-19 13:08:23');
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
  `job_type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_schedulers`
--

LOCK TABLES `email_schedulers` WRITE;
/*!40000 ALTER TABLE `email_schedulers` DISABLE KEYS */;
INSERT INTO `email_schedulers` VALUES (1,'MIS Entry Creation Check','0 11 * * *',1,'mis_creation_check','2026-02-08 06:46:04','2026-02-13 11:44:36'),(2,'MIS Escalation Check','0 12 * * *',1,'mis_escalation_check','2026-02-08 06:46:04','2026-02-13 11:44:36');
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
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`),
  UNIQUE KEY `name_25` (`name`),
  UNIQUE KEY `name_26` (`name`),
  UNIQUE KEY `name_27` (`name`),
  UNIQUE KEY `name_28` (`name`),
  UNIQUE KEY `name_29` (`name`),
  UNIQUE KEY `name_30` (`name`),
  UNIQUE KEY `name_31` (`name`),
  UNIQUE KEY `name_32` (`name`),
  UNIQUE KEY `name_33` (`name`),
  UNIQUE KEY `name_34` (`name`),
  UNIQUE KEY `name_35` (`name`),
  UNIQUE KEY `name_36` (`name`),
  UNIQUE KEY `name_37` (`name`),
  UNIQUE KEY `name_38` (`name`),
  UNIQUE KEY `name_39` (`name`),
  UNIQUE KEY `name_40` (`name`),
  UNIQUE KEY `name_41` (`name`),
  UNIQUE KEY `name_42` (`name`),
  UNIQUE KEY `name_43` (`name`),
  UNIQUE KEY `name_44` (`name`),
  UNIQUE KEY `name_45` (`name`),
  UNIQUE KEY `name_46` (`name`),
  UNIQUE KEY `name_47` (`name`),
  UNIQUE KEY `name_48` (`name`),
  UNIQUE KEY `name_49` (`name`),
  UNIQUE KEY `name_50` (`name`),
  UNIQUE KEY `name_51` (`name`),
  UNIQUE KEY `name_52` (`name`),
  UNIQUE KEY `name_53` (`name`),
  UNIQUE KEY `name_54` (`name`),
  UNIQUE KEY `name_55` (`name`),
  UNIQUE KEY `name_56` (`name`),
  UNIQUE KEY `name_57` (`name`),
  UNIQUE KEY `name_58` (`name`),
  UNIQUE KEY `name_59` (`name`),
  UNIQUE KEY `name_60` (`name`),
  UNIQUE KEY `name_61` (`name`),
  UNIQUE KEY `name_62` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_templates`
--

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
INSERT INTO `email_templates` VALUES (1,'mis_not_created','MIS Entry Missing for {{date}}','<p>Hello,</p><p>The MIS entry for {{date}} has NOT been created yet. Please create it immediately.</p>','2026-02-08 06:44:51','2026-02-08 06:44:51'),(2,'mis_not_submitted','MIS Entry Pending Submission for {{date}}','<p>Hello,</p><p>The MIS entry for {{date}} is created but NOT submitted. Please submit it immediately.</p>','2026-02-08 06:44:51','2026-02-08 06:44:51'),(3,'mis_escalation','ESCALATION: MIS Entry Overdue for {{date}}','<p>Hello Manager,</p><p>The MIS entry for {{date}} has not been submitted by the deadline. Please investigate.</p>','2026-02-08 06:44:51','2026-02-08 06:44:51');
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
INSERT INTO `final_mis_report_config` VALUES (1,'[\"raghul.je@refex.co.in\"]','SREL CBG Plant – Consolidated MIS Report','<p>\nPlease find attached the <strong>SREL CBG Plant MIS Report</strong> for the period:\n<strong>{{from_date}} to {{to_date}}</strong>.\n</p>\n\n<p>\nPlant: SREL CBG Facility<br/>\nReport Generated On: {{generated_datetime}}\n</p>','monthly','09:00',NULL,0,'2026-02-11 10:05:03','2026-02-07 13:23:47','2026-02-11 10:05:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_logs`
--

LOCK TABLES `import_logs` WRITE;
/*!40000 ALTER TABLE `import_logs` DISABLE KEYS */;
INSERT INTO `import_logs` VALUES (1,'MIS_Import_Template_Feb20_to_Feb28.xlsx','partial',8,1,'[{\"error\": \"Validation error\", \"rowIndex\": 2}]',4,'2026-02-11 09:31:00','2026-02-11 09:31:00'),(2,'MIS_Import_Template_Mar1_to_Mar10.xlsx','success',10,0,NULL,4,'2026-02-11 09:31:07','2026-02-11 09:31:07'),(3,'MIS_Import_Template_Mar1_to_Mar10.xlsx','failed',0,10,'[{\"error\": \"Validation error\", \"rowIndex\": 2}, {\"error\": \"Validation error\", \"rowIndex\": 3}, {\"error\": \"Validation error\", \"rowIndex\": 4}, {\"error\": \"Validation error\", \"rowIndex\": 5}, {\"error\": \"Validation error\", \"rowIndex\": 6}, {\"error\": \"Validation error\", \"rowIndex\": 7}, {\"error\": \"Validation error\", \"rowIndex\": 8}, {\"error\": \"Validation error\", \"rowIndex\": 9}, {\"error\": \"Validation error\", \"rowIndex\": 10}, {\"error\": \"Validation error\", \"rowIndex\": 11}]',4,'2026-02-13 06:08:21','2026-02-13 06:08:21'),(4,'MIS_Import_Template_Feb20_to_Feb28.xlsx','failed',0,9,'[{\"error\": \"Validation error\", \"rowIndex\": 2}, {\"error\": \"Validation error\", \"rowIndex\": 3}, {\"error\": \"Validation error\", \"rowIndex\": 4}, {\"error\": \"Validation error\", \"rowIndex\": 5}, {\"error\": \"Validation error\", \"rowIndex\": 6}, {\"error\": \"Validation error\", \"rowIndex\": 7}, {\"error\": \"Validation error\", \"rowIndex\": 8}, {\"error\": \"Validation error\", \"rowIndex\": 9}, {\"error\": \"Validation error\", \"rowIndex\": 10}]',4,'2026-02-13 06:11:39','2026-02-13 06:11:39'),(5,'mis_entries_export_2026-02-17.xlsx','partial',14,1,'[{\"error\": \"Validation error\", \"rowIndex\": 2}]',4,'2026-02-17 17:22:15','2026-02-17 17:22:15'),(6,'mis_entries_export_2026-02-19.xlsx','success',18,0,NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
  KEY `fk_mis_biogas_data_entry_id` (`entry_id`),
  CONSTRAINT `fk_mis_biogas_data_entry_id` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `mis_cbg_sales`
--

DROP TABLE IF EXISTS `mis_cbg_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_cbg_sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entry_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `quantity` float NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `mis_cbg_sales_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `mis_cbg_sales_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_cbg_sales`
--

LOCK TABLES `mis_cbg_sales` WRITE;
/*!40000 ALTER TABLE `mis_cbg_sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `mis_cbg_sales` ENABLE KEYS */;
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
INSERT INTO `mis_compressed_biogas` VALUES (16,17,3140,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,3011,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,2945,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,3321,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,3300,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,3495,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,2701,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,3123,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,3343,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,3092,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,3538,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,3482,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,3258,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,3102,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,3230,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,3479,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,3001,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,2648,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_compressors` VALUES (16,17,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mis_daily_entries_date_shift` (`date`,`shift`),
  KEY `mis_daily_entries_date` (`date`),
  KEY `mis_daily_entries_status` (`status`),
  KEY `mis_daily_entries_created_by` (`created_by`),
  CONSTRAINT `mis_daily_entries_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_daily_entries`
--

LOCK TABLES `mis_daily_entries` WRITE;
/*!40000 ALTER TABLE `mis_daily_entries` DISABLE KEYS */;
INSERT INTO `mis_daily_entries` VALUES (17,'2026-02-18','General','submitted',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(18,'2026-02-17','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(19,'2026-02-16','General','submitted',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(20,'2026-02-15','General','submitted',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(21,'2026-02-14','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(22,'2026-02-13','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(23,'2026-02-12','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(24,'2026-02-11','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(25,'2026-02-10','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(26,'2026-02-09','General','draft',NULL,4,'2026-02-19 16:32:08','2026-02-19 16:32:08',NULL),(27,'2026-02-08','General','submitted',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(28,'2026-02-07','General','draft',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(29,'2026-02-06','General','draft',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(30,'2026-02-05','General','draft',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(31,'2026-02-04','General','submitted',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(32,'2026-02-03','General','submitted',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(33,'2026-02-02','General','submitted',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL),(34,'2026-02-01','General','submitted',NULL,4,'2026-02-19 16:32:09','2026-02-19 16:32:09',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_digester_data`
--

LOCK TABLES `mis_digester_data` WRITE;
/*!40000 ALTER TABLE `mis_digester_data` DISABLE KEYS */;
INSERT INTO `mis_digester_data` VALUES (82,17,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(83,17,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(84,17,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(85,18,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(86,18,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(87,18,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(88,19,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(89,19,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(90,19,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(91,20,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(92,20,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(93,20,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(94,21,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(95,21,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(96,21,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(97,22,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(98,22,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(99,22,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(100,23,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(101,23,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(102,23,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(103,24,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(104,24,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(105,24,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(106,25,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(107,25,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(108,25,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(109,26,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(110,26,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(111,26,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(112,27,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(113,27,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(114,27,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(115,28,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(116,28,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(117,28,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(118,29,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(119,29,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(120,29,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(121,30,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(122,30,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(123,30,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(124,31,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(125,31,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(126,31,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(127,32,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(128,32,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(129,32,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(130,33,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(131,33,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(132,33,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(133,34,'Digester 01',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(134,34,'Digester 02',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(135,34,'Digester 03',0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
  `not_submitted_notify_emails` text COMMENT 'JSON array of email addresses',
  `escalation_notify_emails` text COMMENT 'JSON array of email addresses',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_email_config`
--

LOCK TABLES `mis_email_config` WRITE;
/*!40000 ALTER TABLE `mis_email_config` DISABLE KEYS */;
INSERT INTO `mis_email_config` VALUES (1,'[\"raghul.je@refex.co.in\"]','[]','[]','[]');
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
  KEY `fk_mis_feed_data_entry_id` (`entry_id`),
  CONSTRAINT `fk_mis_feed_data_entry_id` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO `mis_feed_mixing_tank` VALUES (16,17,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(26,27,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,85,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,79,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,80,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_fertilizer_data` VALUES (16,17,9,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,7.5,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,6.6,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,5.24,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,3,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,4,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,4.2,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,7,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,6.4,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,9.8,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,5.4,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,5,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_hse_data` VALUES (16,17,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_manpower_data` VALUES (16,17,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_plant_availability` VALUES (16,17,22.25,0,0,22.25,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,21.3,0,0,21.3,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,21.3,0,0,21.3,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,23,0,0,23,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,23.14,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,18.44,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,18.44,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,23.05,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,23,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,21.15,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,24,0,0,23,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,25,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,22.15,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,21,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,21.45,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,23,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,21.1,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,20.15,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
  KEY `fk_mis_power_data_entry_id` (`entry_id`),
  CONSTRAINT `fk_mis_power_data_entry_id` FOREIGN KEY (`entry_id`) REFERENCES `mis_daily_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO `mis_raw_biogas` VALUES (16,17,0,0,0,8088,0,95.15,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,7852,0,92.36,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,7851,0,92.36,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,8410,0,98.94,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,8527,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,8657,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,6783,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,7816,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,8429,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,7479,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(26,27,0,0,0,8441,0,99.3,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,8454,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,7840,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,7469,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,7680,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,8415,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,7501,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,7100,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_raw_biogas_quality` VALUES (16,17,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_raw_materials`
--

LOCK TABLES `mis_raw_materials` WRITE;
/*!40000 ALTER TABLE `mis_raw_materials` DISABLE KEYS */;
INSERT INTO `mis_raw_materials` VALUES (16,17,0,0,0,0,0,0,0,9370,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,0,0,0,0,9285,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,0,0,0,0,9200,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,0,0,0,0,9115,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,0,0,0,0,9030,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,0,0,0,0,8945,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,0,0,0,0,8860,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,0,0,0,0,8775,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,0,0,0,0,8690,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,0,0,0,0,8605,0,NULL,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(26,27,0,0,0,0,0,0,0,8520,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,0,0,0,0,8435,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,0,0,0,0,8350,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,0,0,0,0,8265,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,0,0,0,0,8180,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,0,0,0,0,8095,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,0,0,0,0,8010,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,0,0,0,0,80,0,NULL,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_sls_data` VALUES (16,17,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,0,0,0,0,0,0,0,0,0,0,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
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
INSERT INTO `mis_utilities` VALUES (16,17,6255,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(17,18,6150,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(18,19,6135,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(19,20,6225,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(20,21,6129,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(21,22,6569,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(22,23,5458,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(23,24,6105,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(24,25,6644,0,'2026-02-19 16:32:08','2026-02-19 16:32:08'),(25,26,5865,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(26,27,6855,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(27,28,6960,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(28,29,6855,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(29,30,6105,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(30,31,5850,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(31,32,6480,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(32,33,5955,0,'2026-02-19 16:32:09','2026-02-19 16:32:09'),(33,34,5970,0,'2026-02-19 16:32:09','2026-02-19 16:32:09');
/*!40000 ALTER TABLE `mis_utilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_schedules`
--

DROP TABLE IF EXISTS `notification_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mis_start_time` time NOT NULL,
  `mis_end_time` time NOT NULL,
  `reminder_start_time` time DEFAULT NULL,
  `reminder_interval_minutes` int NOT NULL,
  `reminder_count` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `target_role` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_schedules`
--

LOCK TABLES `notification_schedules` WRITE;
/*!40000 ALTER TABLE `notification_schedules` DISABLE KEYS */;
INSERT INTO `notification_schedules` VALUES (1,'Reminder','11:00:00','12:00:00','12:00:00',60,4,1,NULL,'2026-02-13 05:12:07','2026-02-13 11:44:46');
/*!40000 ALTER TABLE `notification_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `token_2` (`token`),
  UNIQUE KEY `token_3` (`token`),
  UNIQUE KEY `token_4` (`token`),
  UNIQUE KEY `token_5` (`token`),
  UNIQUE KEY `token_6` (`token`),
  UNIQUE KEY `token_7` (`token`),
  UNIQUE KEY `token_8` (`token`),
  UNIQUE KEY `token_9` (`token`),
  UNIQUE KEY `token_10` (`token`),
  UNIQUE KEY `token_11` (`token`),
  UNIQUE KEY `token_12` (`token`),
  UNIQUE KEY `token_13` (`token`),
  UNIQUE KEY `token_14` (`token`),
  UNIQUE KEY `token_15` (`token`),
  UNIQUE KEY `token_16` (`token`),
  UNIQUE KEY `token_17` (`token`),
  UNIQUE KEY `token_18` (`token`),
  UNIQUE KEY `token_19` (`token`),
  UNIQUE KEY `token_20` (`token`),
  UNIQUE KEY `token_21` (`token`),
  UNIQUE KEY `token_22` (`token`),
  UNIQUE KEY `token_23` (`token`),
  UNIQUE KEY `token_24` (`token`),
  UNIQUE KEY `token_25` (`token`),
  UNIQUE KEY `token_26` (`token`),
  UNIQUE KEY `token_27` (`token`),
  UNIQUE KEY `token_28` (`token`),
  UNIQUE KEY `token_29` (`token`),
  UNIQUE KEY `token_30` (`token`),
  UNIQUE KEY `token_31` (`token`),
  UNIQUE KEY `token_32` (`token`),
  UNIQUE KEY `token_33` (`token`),
  UNIQUE KEY `token_34` (`token`),
  UNIQUE KEY `token_35` (`token`),
  UNIQUE KEY `token_36` (`token`),
  UNIQUE KEY `token_37` (`token`),
  UNIQUE KEY `token_38` (`token`),
  UNIQUE KEY `token_39` (`token`),
  UNIQUE KEY `token_40` (`token`),
  UNIQUE KEY `token_41` (`token`),
  UNIQUE KEY `token_42` (`token`),
  UNIQUE KEY `token_43` (`token`),
  UNIQUE KEY `token_44` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
INSERT INTO `password_reset_tokens` VALUES (1,5,'5c9eddf93af5bba32b67252301646801a82937c66755c2fb83e0a5676f6cabc8','2026-02-09 10:42:29',0,'2026-02-09 09:42:29','2026-02-09 09:42:29'),(2,4,'f00481cbdf527498702d51a2160bf83a9cb377034ecff30894cfc1e67e24fe12','2026-02-13 12:01:43',0,'2026-02-13 11:01:43','2026-02-13 11:01:43'),(3,4,'279d7355dd0b03beb8c64d1c92629332a5b992e96bf4360b46c5ec685c1ff295','2026-02-13 12:13:58',1,'2026-02-13 11:13:58','2026-02-13 11:15:11'),(4,4,'597c02cb4f2d979a5ce994394d1710789d0f4c6dc3847499a921e5d8d0d82f95','2026-02-13 12:38:48',1,'2026-02-13 11:38:48','2026-02-13 11:39:19'),(5,4,'90f2eace44922991c79ff0fb02a37343902732d3245c8a62801b6feab1917de0','2026-02-17 06:59:06',0,'2026-02-17 05:59:06','2026-02-17 05:59:06'),(6,4,'e0d021aa54850c9e6a28a7b0639c97cdf246e407b61045a22ba32aa114e2ccf9','2026-02-19 14:08:19',0,'2026-02-19 13:08:19','2026-02-19 13:08:19');
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
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
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`),
  UNIQUE KEY `name_25` (`name`),
  UNIQUE KEY `name_26` (`name`),
  UNIQUE KEY `name_27` (`name`),
  UNIQUE KEY `name_28` (`name`),
  UNIQUE KEY `name_29` (`name`),
  UNIQUE KEY `name_30` (`name`),
  UNIQUE KEY `name_31` (`name`),
  UNIQUE KEY `name_32` (`name`),
  UNIQUE KEY `name_33` (`name`),
  UNIQUE KEY `name_34` (`name`),
  UNIQUE KEY `name_35` (`name`),
  UNIQUE KEY `name_36` (`name`),
  UNIQUE KEY `name_37` (`name`),
  UNIQUE KEY `name_38` (`name`),
  UNIQUE KEY `name_39` (`name`),
  UNIQUE KEY `name_40` (`name`),
  UNIQUE KEY `name_41` (`name`),
  UNIQUE KEY `name_42` (`name`),
  UNIQUE KEY `name_43` (`name`),
  UNIQUE KEY `name_44` (`name`),
  UNIQUE KEY `name_45` (`name`),
  UNIQUE KEY `name_46` (`name`),
  UNIQUE KEY `name_47` (`name`),
  UNIQUE KEY `name_48` (`name`),
  UNIQUE KEY `name_49` (`name`),
  UNIQUE KEY `name_50` (`name`),
  UNIQUE KEY `name_51` (`name`),
  UNIQUE KEY `name_52` (`name`),
  UNIQUE KEY `name_53` (`name`),
  UNIQUE KEY `name_54` (`name`),
  UNIQUE KEY `name_55` (`name`),
  UNIQUE KEY `name_56` (`name`),
  UNIQUE KEY `name_57` (`name`),
  UNIQUE KEY `name_58` (`name`),
  UNIQUE KEY `name_59` (`name`),
  UNIQUE KEY `name_60` (`name`),
  UNIQUE KEY `name_61` (`name`),
  UNIQUE KEY `name_62` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'mis_entry:create',NULL,'mis_entry','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(2,'mis_entry:read',NULL,'mis_entry','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(3,'mis_entry:update',NULL,'mis_entry','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(4,'mis_entry:delete',NULL,'mis_entry','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(5,'mis_entry:submit',NULL,'mis_entry','submit','2026-02-07 04:43:02','2026-02-07 04:43:02'),(6,'mis_entry:approve',NULL,'mis_entry','approve','2026-02-07 04:43:02','2026-02-07 04:43:02'),(7,'mis_entry:import',NULL,'mis_entry','import','2026-02-07 04:43:02','2026-02-07 04:43:02'),(8,'mis_entry:export',NULL,'mis_entry','export','2026-02-07 04:43:02','2026-02-07 04:43:02'),(9,'user:read',NULL,'user','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(10,'user:create',NULL,'user','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(11,'user:update',NULL,'user','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(12,'user:delete',NULL,'user','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(13,'role:read',NULL,'role','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(14,'role:create',NULL,'role','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(15,'role:update',NULL,'role','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(16,'role:delete',NULL,'role','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(17,'config:read',NULL,'config','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(18,'config:create',NULL,'config','create','2026-02-07 04:43:02','2026-02-07 04:43:02'),(19,'config:update',NULL,'config','update','2026-02-07 04:43:02','2026-02-07 04:43:02'),(20,'config:delete',NULL,'config','delete','2026-02-07 04:43:02','2026-02-07 04:43:02'),(21,'audit:read',NULL,'audit','read','2026-02-07 04:43:02','2026-02-07 04:43:02'),(22,'customer:create',NULL,'customer','create','2026-02-17 11:26:53','2026-02-17 11:26:53'),(23,'customer:read',NULL,'customer','read','2026-02-17 11:26:53','2026-02-17 11:26:53'),(24,'customer:update',NULL,'customer','update','2026-02-17 11:26:53','2026-02-17 11:26:53'),(25,'customer:delete',NULL,'customer','delete','2026-02-17 11:26:53','2026-02-17 11:26:53'),(26,'dashboard:read',NULL,'dashboard','read','2026-02-19 09:55:38','2026-02-19 09:55:38'),(27,'dashboard:create',NULL,'dashboard','create','2026-02-19 09:55:38','2026-02-19 09:55:38'),(28,'dashboard:update',NULL,'dashboard','update','2026-02-19 09:55:38','2026-02-19 09:55:38'),(29,'dashboard:delete',NULL,'dashboard','delete','2026-02-19 09:55:38','2026-02-19 09:55:38'),(30,'consolidated_mis:read',NULL,'consolidated_mis','read','2026-02-19 09:55:38','2026-02-19 09:55:38'),(31,'consolidated_mis:create',NULL,'consolidated_mis','create','2026-02-19 09:55:38','2026-02-19 09:55:38'),(32,'consolidated_mis:update',NULL,'consolidated_mis','update','2026-02-19 09:55:38','2026-02-19 09:55:38'),(33,'consolidated_mis:delete',NULL,'consolidated_mis','delete','2026-02-19 09:55:38','2026-02-19 09:55:38'),(34,'import_data:read',NULL,'import_data','read','2026-02-19 09:55:38','2026-02-19 09:55:38'),(35,'import_data:create',NULL,'import_data','create','2026-02-19 09:55:38','2026-02-19 09:55:38'),(36,'import_data:update',NULL,'import_data','update','2026-02-19 09:55:38','2026-02-19 09:55:38'),(37,'import_data:delete',NULL,'import_data','delete','2026-02-19 09:55:38','2026-02-19 09:55:38');
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
INSERT INTO `role_permissions` VALUES (1,1),(2,1),(3,1),(1,2),(2,2),(3,2),(1,3),(2,3),(3,3),(1,4),(2,4),(1,5),(2,5),(3,5),(1,6),(2,6),(1,7),(2,7),(1,8),(2,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(2,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37);
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
  UNIQUE KEY `name_2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','System Administrator','2026-02-07 04:43:02','2026-02-07 04:43:02'),(2,'Manager','Plant Manager','2026-02-07 04:43:02','2026-02-07 04:43:02'),(3,'Operator','Data Entry Operator','2026-02-07 04:43:02','2026-02-07 04:43:02'),(4,'Site User',NULL,'2026-02-08 06:44:51','2026-02-08 06:44:51');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_activity_logs`
--

LOCK TABLES `user_activity_logs` WRITE;
/*!40000 ALTER TABLE `user_activity_logs` DISABLE KEYS */;
INSERT INTO `user_activity_logs` VALUES (1,1,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 04:49:37','2026-02-07 04:49:37'),(2,1,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 04:50:00','2026-02-07 04:50:00'),(3,1,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 05:01:18','2026-02-07 05:01:18'),(4,1,'LOGOUT','User logged out',NULL,'::1','2026-02-07 05:17:23','2026-02-07 05:17:23'),(5,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 05:17:29','2026-02-07 05:17:29'),(6,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 06:04:47','2026-02-07 06:04:47'),(7,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 06:04:52','2026-02-07 06:04:52'),(8,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:07:17','2026-02-07 07:07:17'),(9,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 07:28:03','2026-02-07 07:28:03'),(10,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:28:08','2026-02-07 07:28:08'),(11,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 07:32:06','2026-02-07 07:32:06'),(12,5,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:32:11','2026-02-07 07:32:11'),(13,5,'LOGOUT','User logged out',NULL,'::1','2026-02-07 07:47:18','2026-02-07 07:47:18'),(14,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 07:47:25','2026-02-07 07:47:25'),(15,5,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 08:00:15','2026-02-07 08:00:15'),(16,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 13:30:43','2026-02-07 13:30:43'),(17,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 13:36:17','2026-02-07 13:36:17'),(18,5,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 13:36:36','2026-02-07 13:36:36'),(19,5,'LOGOUT','User logged out',NULL,'::1','2026-02-07 14:55:44','2026-02-07 14:55:44'),(20,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 14:55:53','2026-02-07 14:55:53'),(21,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 15:07:38','2026-02-07 15:07:38'),(22,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 15:15:54','2026-02-07 15:15:54'),(23,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 15:16:00','2026-02-07 15:16:00'),(24,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 15:16:04','2026-02-07 15:16:04'),(25,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 15:20:06','2026-02-07 15:20:06'),(26,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 15:20:10','2026-02-07 15:20:10'),(27,5,'LOGIN_FAILED','Invalid password',NULL,'::1','2026-02-07 16:02:29','2026-02-07 16:02:29'),(28,4,'LOGIN_FAILED','Invalid password',NULL,'::1','2026-02-07 16:02:51','2026-02-07 16:02:51'),(29,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-07 16:02:54','2026-02-07 16:02:54'),(30,4,'LOGOUT','User logged out',NULL,'::1','2026-02-07 17:01:27','2026-02-07 17:01:27'),(31,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-08 06:49:29','2026-02-08 06:49:29'),(32,4,'LOGOUT','User logged out',NULL,'::1','2026-02-08 06:57:50','2026-02-08 06:57:50'),(33,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-08 06:57:56','2026-02-08 06:57:56'),(34,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 05:32:48','2026-02-09 05:32:48'),(35,4,'LOGIN','User logged in successfully',NULL,'::1','2026-02-09 05:33:00','2026-02-09 05:33:00'),(36,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 06:03:59','2026-02-09 06:03:59'),(37,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 08:47:57','2026-02-09 08:47:57'),(38,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 08:56:52','2026-02-09 08:56:52'),(39,4,'LOGIN','User logged in successfully','{\"os\": \"iOS\", \"browser\": \"Safari\", \"userAgent\": \"Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1\", \"deviceType\": \"Mobile\"}','::1','2026-02-09 08:58:53','2026-02-09 08:58:53'),(40,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 09:10:05','2026-02-09 09:10:05'),(41,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 09:10:09','2026-02-09 09:10:09'),(42,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 09:42:12','2026-02-09 09:42:12'),(43,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 09:42:40','2026-02-09 09:42:40'),(44,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 09:44:01','2026-02-09 09:44:01'),(45,4,'LOGIN','User logged in successfully','{\"os\": \"iOS\", \"browser\": \"Safari\", \"userAgent\": \"Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1\", \"deviceType\": \"Mobile\"}','::1','2026-02-09 09:44:05','2026-02-09 09:44:05'),(46,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 09:49:22','2026-02-09 09:49:22'),(47,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 09:49:34','2026-02-09 09:49:34'),(48,6,'LOGOUT','User logged out',NULL,'::1','2026-02-09 09:54:55','2026-02-09 09:54:55'),(49,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 09:54:59','2026-02-09 09:54:59'),(50,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 10:53:24','2026-02-09 10:53:24'),(51,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 10:53:31','2026-02-09 10:53:31'),(52,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','::1','2026-02-09 11:17:59','2026-02-09 11:17:59'),(53,4,'LOGOUT','User logged out',NULL,'::1','2026-02-09 12:14:34','2026-02-09 12:14:34'),(54,4,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-11 09:23:42','2026-02-11 09:23:42'),(55,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-11 09:23:45','2026-02-11 09:23:45'),(56,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-11 09:44:56','2026-02-11 09:44:56'),(57,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-11 10:44:57','2026-02-11 10:44:57'),(58,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 04:44:15','2026-02-13 04:44:15'),(59,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 05:44:16','2026-02-13 05:44:16'),(60,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 05:49:36','2026-02-13 05:49:36'),(61,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 06:49:36','2026-02-13 06:49:36'),(62,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 06:58:43','2026-02-13 06:58:43'),(63,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 09:30:36','2026-02-13 09:30:36'),(64,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 09:35:47','2026-02-13 09:35:47'),(65,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 09:35:51','2026-02-13 09:35:51'),(66,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:00:18','2026-02-13 11:00:18'),(67,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 11:01:26','2026-02-13 11:01:26'),(68,4,'PASSWORD_RESET','User reset password via token',NULL,'127.0.0.1','2026-02-13 11:15:11','2026-02-13 11:15:11'),(69,4,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:15:19','2026-02-13 11:15:19'),(70,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:15:27','2026-02-13 11:15:27'),(71,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 11:38:33','2026-02-13 11:38:33'),(72,4,'PASSWORD_RESET','User reset password via token',NULL,'127.0.0.1','2026-02-13 11:39:19','2026-02-13 11:39:19'),(73,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:39:24','2026-02-13 11:39:24'),(74,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 11:51:17','2026-02-13 11:51:17'),(75,12,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:51:20','2026-02-13 11:51:20'),(76,12,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 11:51:27','2026-02-13 11:51:27'),(77,11,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:51:30','2026-02-13 11:51:30'),(78,11,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 11:51:33','2026-02-13 11:51:33'),(79,8,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:51:36','2026-02-13 11:51:36'),(80,8,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-13 11:51:39','2026-02-13 11:51:39'),(81,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-13 11:51:42','2026-02-13 11:51:42'),(82,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-16 05:38:44','2026-02-16 05:38:44'),(83,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-16 06:17:49','2026-02-16 06:17:49'),(84,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-16 06:18:15','2026-02-16 06:18:15'),(85,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-16 07:18:16','2026-02-16 07:18:16'),(86,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:57:54','2026-02-17 05:57:54'),(87,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:58:05','2026-02-17 05:58:05'),(88,4,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:58:16','2026-02-17 05:58:16'),(89,4,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:58:17','2026-02-17 05:58:17'),(90,4,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:58:20','2026-02-17 05:58:20'),(91,4,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:58:22','2026-02-17 05:58:22'),(92,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 05:58:46','2026-02-17 05:58:46'),(93,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 06:05:20','2026-02-17 06:05:20'),(94,1,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 06:18:31','2026-02-17 06:18:31'),(95,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 08:35:51','2026-02-17 08:35:51'),(96,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-17 08:40:50','2026-02-17 08:40:50'),(97,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 08:40:53','2026-02-17 08:40:53'),(98,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 11:10:43','2026-02-17 11:10:43'),(99,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-17 12:10:44','2026-02-17 12:10:44'),(100,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 12:15:42','2026-02-17 12:15:42'),(101,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 15:58:01','2026-02-17 15:58:01'),(102,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 16:58:43','2026-02-17 16:58:43'),(103,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-17 17:20:51','2026-02-17 17:20:51'),(104,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-17 17:21:50','2026-02-17 17:21:50'),(105,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-17 17:23:20','2026-02-17 17:23:20'),(106,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-18 04:40:20','2026-02-18 04:40:20'),(107,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-18 04:59:45','2026-02-18 04:59:45'),(108,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-18 08:25:56','2026-02-18 08:25:56'),(109,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-18 09:25:57','2026-02-18 09:25:57'),(110,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:20:59','2026-02-19 07:20:59'),(111,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 07:32:52','2026-02-19 07:32:52'),(112,6,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:33:07','2026-02-19 07:33:07'),(113,6,'LOGIN_FAILED','Invalid password','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:33:14','2026-02-19 07:33:14'),(114,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:33:20','2026-02-19 07:33:20'),(115,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 07:34:07','2026-02-19 07:34:07'),(116,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:34:12','2026-02-19 07:34:12'),(117,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 07:40:21','2026-02-19 07:40:21'),(118,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:40:26','2026-02-19 07:40:26'),(119,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 07:42:20','2026-02-19 07:42:20'),(120,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:42:24','2026-02-19 07:42:24'),(121,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 07:59:19','2026-02-19 07:59:19'),(122,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 07:59:23','2026-02-19 07:59:23'),(123,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 08:58:59','2026-02-19 08:58:59'),(124,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 08:59:03','2026-02-19 08:59:03'),(125,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 08:59:27','2026-02-19 08:59:27'),(126,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 08:59:31','2026-02-19 08:59:31'),(127,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:00:10','2026-02-19 09:00:10'),(128,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:00:16','2026-02-19 09:00:16'),(129,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:00:26','2026-02-19 09:00:26'),(130,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:00:30','2026-02-19 09:00:30'),(131,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:02:30','2026-02-19 09:02:30'),(132,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:03:26','2026-02-19 09:03:26'),(133,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:29:44','2026-02-19 09:29:44'),(134,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:29:49','2026-02-19 09:29:49'),(135,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:31:37','2026-02-19 09:31:37'),(136,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:31:44','2026-02-19 09:31:44'),(137,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:32:33','2026-02-19 09:32:33'),(138,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:32:36','2026-02-19 09:32:36'),(139,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:32:40','2026-02-19 09:32:40'),(140,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:32:45','2026-02-19 09:32:45'),(141,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:32:56','2026-02-19 09:32:56'),(142,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:33:01','2026-02-19 09:33:01'),(143,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 09:39:02','2026-02-19 09:39:02'),(144,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 09:50:06','2026-02-19 09:50:06'),(145,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:28:30','2026-02-19 10:28:30'),(146,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:28:35','2026-02-19 10:28:35'),(147,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:28:50','2026-02-19 10:28:50'),(148,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:28:55','2026-02-19 10:28:55'),(149,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:29:26','2026-02-19 10:29:26'),(150,12,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:29:31','2026-02-19 10:29:31'),(151,12,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:29:49','2026-02-19 10:29:49'),(152,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:55:56','2026-02-19 10:55:56'),(153,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:58:19','2026-02-19 10:58:19'),(154,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:58:24','2026-02-19 10:58:24'),(155,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:58:41','2026-02-19 10:58:41'),(156,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:58:47','2026-02-19 10:58:47'),(157,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:59:17','2026-02-19 10:59:17'),(158,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:59:20','2026-02-19 10:59:20'),(159,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:59:23','2026-02-19 10:59:23'),(160,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:59:28','2026-02-19 10:59:28'),(161,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 10:59:50','2026-02-19 10:59:50'),(162,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 10:59:54','2026-02-19 10:59:54'),(163,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 11:00:18','2026-02-19 11:00:18'),(164,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 11:00:22','2026-02-19 11:00:22'),(165,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 11:30:42','2026-02-19 11:30:42'),(166,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 11:30:46','2026-02-19 11:30:46'),(167,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 11:31:51','2026-02-19 11:31:51'),(168,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 11:31:54','2026-02-19 11:31:54'),(169,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:25:38','2026-02-19 12:25:38'),(170,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 12:25:42','2026-02-19 12:25:42'),(171,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:36:19','2026-02-19 12:36:19'),(172,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 12:36:24','2026-02-19 12:36:24'),(173,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:36:36','2026-02-19 12:36:36'),(174,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 12:36:38','2026-02-19 12:36:38'),(175,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:46:05','2026-02-19 12:46:05'),(176,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 12:46:08','2026-02-19 12:46:08'),(177,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:48:31','2026-02-19 12:48:31'),(178,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 12:48:41','2026-02-19 12:48:41'),(179,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:50:30','2026-02-19 12:50:30'),(180,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 12:50:33','2026-02-19 12:50:33'),(181,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 12:57:53','2026-02-19 12:57:53'),(182,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 13:35:02','2026-02-19 13:35:02'),(183,4,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 13:46:55','2026-02-19 13:46:55'),(184,6,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 13:47:16','2026-02-19 13:47:16'),(185,6,'LOGOUT','User logged out',NULL,'127.0.0.1','2026-02-19 13:47:23','2026-02-19 13:47:23'),(186,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 13:47:27','2026-02-19 13:47:27'),(187,4,'LOGIN','User logged in successfully','{\"os\": \"Windows\", \"browser\": \"Chrome\", \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36\", \"deviceType\": \"Desktop\"}','127.0.0.1','2026-02-19 16:09:50','2026-02-19 16:09:50');
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
INSERT INTO `user_permissions` VALUES (6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(6,3),(7,3),(8,3),(9,3),(10,3),(11,3),(6,5),(7,5),(8,5),(9,5),(10,5),(11,5),(6,7),(6,8),(6,17),(7,17),(8,17),(9,17),(10,17),(11,17),(12,17),(8,18),(9,18),(9,19),(7,21),(8,21),(9,21),(10,21),(11,21),(6,26),(12,26);
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
  `is_custom_perm` tinyint(1) DEFAULT '0',
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
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`),
  UNIQUE KEY `email_37` (`email`),
  UNIQUE KEY `email_38` (`email`),
  UNIQUE KEY `email_39` (`email`),
  UNIQUE KEY `email_40` (`email`),
  UNIQUE KEY `email_41` (`email`),
  UNIQUE KEY `email_42` (`email`),
  UNIQUE KEY `email_43` (`email`),
  UNIQUE KEY `email_44` (`email`),
  UNIQUE KEY `email_45` (`email`),
  UNIQUE KEY `email_46` (`email`),
  UNIQUE KEY `email_47` (`email`),
  UNIQUE KEY `email_48` (`email`),
  UNIQUE KEY `email_49` (`email`),
  UNIQUE KEY `email_50` (`email`),
  UNIQUE KEY `email_51` (`email`),
  UNIQUE KEY `email_52` (`email`),
  UNIQUE KEY `email_53` (`email`),
  UNIQUE KEY `email_54` (`email`),
  UNIQUE KEY `email_55` (`email`),
  UNIQUE KEY `email_56` (`email`),
  UNIQUE KEY `email_57` (`email`),
  UNIQUE KEY `email_58` (`email`),
  UNIQUE KEY `email_59` (`email`),
  UNIQUE KEY `email_60` (`email`),
  UNIQUE KEY `email_61` (`email`),
  UNIQUE KEY `email_62` (`email`),
  KEY `users_role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Admin','admin@biogas.com','$2b$10$7Xigu4906djS9wZUH62z5.QWiccx317IGt3FCnrVJrQjVWA1zgctq',1,1,'2026-02-07 04:43:02','2026-02-07 04:43:02',0),(2,'John Operator','operator@biogas.com','$2b$10$G8x.GwxdNxr4Ebs2AbeQNOI4/W2bEKSqgBvwCclhiUtEEYpuYUHmW',3,0,'2026-02-07 04:43:02','2026-02-07 05:07:27',0),(3,'Jane Manager','manager@biogas.com','$2b$10$PWhHka5OXZaYJSRJQqgEW.SXeh7Le1jWIZlltwfTB/0Izi9eE0AYS',2,0,'2026-02-07 04:43:02','2026-02-07 05:07:24',0),(4,'Raghul','raghul.je@refex.co.in','$2b$10$a5nxszTYTPLRuuGCh7S5T.vYMCZxDA6R9Y7QdeG08yvzyBOfZZtl.',1,1,'2026-02-07 05:02:49','2026-02-13 11:39:19',0),(5,'Murugesh','murugesh.k@refex.co.in','$2b$10$Skuw4CmjMECBpiM.7FKgA.JciZGyoTkTckBc69VOYReomUVdOLRYK',1,1,'2026-02-07 05:05:05','2026-02-07 05:05:05',0),(6,'sathish','sathishkumar.r@refex.co.in','$2b$10$Yx8CgIXS64ICkPMlbe38OeQ0WokjBFV5OCatGMz7AO6W4U0KrqBr2',2,1,'2026-02-09 09:46:50','2026-02-19 09:00:06',1),(7,'Saravanan','saravanan.v@refex.co.in','$2b$10$uqyjsuQkVYqu4h7KdR7QJOm3tL3ioWc/SPZB1aaqFk8B59KRxSd9G',3,1,'2026-02-13 11:46:13','2026-02-13 11:46:13',0),(8,'Kalpesh','kalpesh.k@refex.co.in','$2b$10$QzQ9uZ9oCiogCFS3gvueLuvVJeaQVTxRFfSSZAaoNAED4o7/RCx3G',3,1,'2026-02-13 11:47:08','2026-02-13 11:47:08',0),(9,'Ramesh','ramesh.c@refex.co.in','$2b$10$TKWD2nscMXktjs27LAPbUeXT48qv3aipo4N2Qk8.KSBHR.KRMajD6',2,1,'2026-02-13 11:48:10','2026-02-13 11:48:10',0),(10,'Rohan DK','rohan.dk@refex.co.in','$2b$10$pG4VZwkVNwytsONtfYzLAuDkNtnhrLrOgrs9jN5fYDt3pUAPqrWrS',3,1,'2026-02-13 11:49:16','2026-02-13 11:49:16',0),(11,'Abhilash AG','abhilash.ag@refex.co.in','$2b$10$29aJjNWjOyM2UQleAeFH7.RPn8Q6elXLCZ1QL9LuArkS4OpmX7YIC',3,1,'2026-02-13 11:50:09','2026-02-13 11:50:09',0),(12,'Abdul Naim','abdul.naim@refex.co.in','$2b$10$NphCfx07KlT53jOivgTkB.l.zr/LjtzZ1Lb7Nwy19CyX8T6hwG.a2',2,1,'2026-02-13 11:51:06','2026-02-19 10:29:23',1);
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

-- Dump completed on 2026-02-19 22:07:22
