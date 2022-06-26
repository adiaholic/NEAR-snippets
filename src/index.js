#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import chalk from 'chalk';

import inquirer from "inquirer";
import create_account from "./functions/create_account.js";
import send_tokens from "./functions/send_tokens.js";
import function_call from './functions/function_call.js';
import delete_account from './functions/delete_account.js';
import {add_key, delete_key, list_keys} from './functions/access_keys.js'
import {stake_tokens} from './functions/staking.js'
import { all_questions } from './utils.js'

async function start() {
  var choices = process.env.CHOICES;
  var choice_array = choices.split(",");

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'task',
        message: 'What do you want to try?',
        choices: choice_array,
        pageSize: 9,
        loop: false
      },
    ])
    .then(answers => {
      console.log("You choise ", answers.task);
      switch(answers.task) {
        case 'Create account':
          console.log(chalk.green("Creating ... "))
          inquirer.prompt(all_questions['create_account']).then(answers => {
              var child_address = answers.response;
              create_account(child_address);
            }
          );
          break;

        case 'Deploy contract':
          console.log(chalk.green("Deploying ... "))
          break;

        case 'Function call':
          console.log(chalk.green("Calling function ... "))
          function_call();
          break;

        case 'Transfer':
          console.log(chalk.green("Transferring tokens ... "))
          inquirer.prompt(all_questions['transfer_tokens']).then(answers => {
              var receiver_address = answers.response;
              send_tokens(receiver_address);
            }
          );
          break;

        case 'Stake':
          console.log(chalk.green("Staking tokens ... "))
          inquirer.prompt(all_questions['stake_tokens']).then(answers => {
              var token_count = answers.response;
              stake_tokens(token_count);
            }
          );
          break;

        case 'Add key':
          console.log(chalk.green("Adding key ...  "))
          inquirer.prompt(all_questions['add_key']).then(answers => {
              var new_key = answers.response;
              add_key(new_key);
            }
          );
          break;

        case 'Delete key':
          console.log(chalk.green("Deleting key ... "))
          inquirer.prompt(all_questions['delete_key']).then(answers => {
              var key = answers.response;
              delete_key(key);
            }
          );
          break;

        case 'List keys':
          console.log(chalk.green("Listing all keys ... "))
          list_keys();
          break;
  
        case 'Delete account':
          console.log(chalk.green("Deleting account ... "))
          delete_account();
          break;
        default:
      }
    });
  }

start()
