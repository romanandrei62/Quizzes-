#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🚀 MagicPatterns Pre-Work Check\n');

try {
  // 1. Check for uncommitted changes
  console.log('📋 Checking for uncommitted changes...');
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (status.trim()) {
    console.log('⚠️  Uncommitted changes found:');
    console.log(status);
    console.log('❌ Please commit or stash changes before pulling!');
    process.exit(1);
  }
  
  console.log('✅ Working directory clean\n');
  
  // 2. Fetch and check for remote changes
  console.log('🔄 Fetching from remote...');
  execSync('git fetch origin main', { stdio: 'inherit' });
  
  const behind = execSync('git rev-list HEAD..origin/main --count', { encoding: 'utf8' });
  const ahead = execSync('git rev-list origin/main..HEAD --count', { encoding: 'utf8' });
  
  if (parseInt(behind) > 0) {
    console.log(`\n⬇️  ${behind.trim()} commits behind origin/main`);
    console.log('📥 Pulling latest changes...');
    execSync('git pull origin main', { stdio: 'inherit' });
    console.log('\n✅ Updated to latest version!');
  } else {
    console.log('✅ Already up to date with origin/main');
  }
  
  if (parseInt(ahead) > 0) {
    console.log(`\n⬆️  You have ${ahead.trim()} unpushed commits`);
  }
  
  // 3. Quick code analysis
  console.log('\n📊 Quick Analysis:');
  
  // Count components
  const componentsCount = execSync('dir /b /s src\\components\\*.tsx | find /c ".tsx"', { encoding: 'utf8', shell: true }).trim();
  console.log(`   - Components: ${componentsCount}`);
  
  // Check for TODOs (Windows compatible)
  try {
    const todos = execSync('findstr /s /i "TODO FIXME" src\\*.tsx src\\*.ts', { encoding: 'utf8' });
    const todoCount = todos.split('\n').filter(line => line.trim()).length;
    if (todoCount > 0) {
      console.log(`   - TODOs/FIXMEs: ${todoCount}`);
    }
  } catch (e) {
    // No TODOs found
  }
  
  console.log('\n✅ Ready to work! Remember to:');
  console.log('   1. Switch to Opus for complex tasks');
  console.log('   2. Commit frequently');
  console.log('   3. Push after each feature');
  
} catch (error) {
  console.error('\n❌ Error during pre-work check:', error.message);
  process.exit(1);
}