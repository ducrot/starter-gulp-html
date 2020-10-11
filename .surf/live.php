<?php
/** @var \TYPO3\Surf\Domain\Model\Deployment $deployment */

use TYPO3\Surf\Application\BaseApplication;
use TYPO3\Surf\Domain\Model\Node;
use TYPO3\Surf\Domain\Model\SimpleWorkflow;
use TYPO3\Surf\Task\LocalShellTask;

// Mandatory settings
$projectName = 'project-name';
$deploymentPath = 'httpdocs';
$deploymentHost = 'domain.tld';

// Use username/password only if ssh over key is not possible
$deploymentUsername = '';
$deploymentPassword = '';

// Set this if you want to deploy from a remote repository
//$repositoryUrl = 'https://github.com/ducrot/starter-gulp-html.git';

// Set this if you want to deploy a different branch than master
//$repositoryBranch = 'master';

// Set this if your composer command is not available in PATH
//$localComposerCommandPath = 'composer';

// Set this, if on remote host the correct PHP binary is not available in PATH
//$remotePhpBinary = '/opt/plesk/php/7.4/bin/php';

// Set web path
$webDirectory = '';

// Exclude from deployment
$rsyncExcludes = [
    '/.git',
    '/node_modules',
    '/src',
    '/tasks',
    '/.babelrc',
    '/.DS_Store',
    '/.gitignore',
    '/.npmrc',
    '/LICENSE',
    '/package.json',
    '/README.md',
    '/yarn.lock',
];

//================================================================
// No changes are required in the default case below this point.
//================================================================

if (!isset($projectName, $deploymentPath, $deploymentHost)) {
    echo '$projectName, $deploymentPath, $deploymentHost needs to be set in your deployment script!' . PHP_EOL;
    exit(1);
}

$application = new BaseApplication($projectName);
$deployment->addApplication($application);

// Set default config values
if (!isset($repositoryUrl)) {
    $repositoryUrl = 'file://' . dirname(__DIR__);
}
if (!isset($repositoryBranch)) {
    $repositoryBranch = getenv('DEPLOY_BRANCH') ?: 'master';
}
if (!isset($localComposerCommandPath)) {
    $localComposerCommandPath = 'composer';
}
if (!isset($remotePhpBinary)) {
    $remotePhpBinary = 'php';
}

$node = new Node($deploymentHost);
$node->setHostname($deploymentHost);
if (@$deploymentUsername) $node->setOption('username', $deploymentUsername);
if (@$deploymentPassword) $node->setOption('password', $deploymentPassword);

$application->addNode($node);

$application->setOption('projectName', $projectName);
$application->setOption('repositoryUrl', $repositoryUrl);
$application->setOption('branch', $repositoryBranch);

$application->setDeploymentPath($deploymentPath);
$application->setOption('keepReleases', 5);
$application->setOption('composerCommandPath', $localComposerCommandPath);
$application->setOption('webDirectory', $webDirectory);
$application->setOption('rsyncExcludes', $rsyncExcludes);

$deployment->setOption('phpBinaryPathAndFilename', $remotePhpBinary);

$deployment->onInitialize(function () use ($deployment, $application) {
    /** @var SimpleWorkflow $workflow */
    $workflow = $deployment->getWorkflow();
    $workflow->setEnableRollback(true);

    $workflow
        ->defineTask('YarnInstallAndBuildTask', LocalShellTask::class, [
            'command' => [
                "cd {workspacePath} && yarn install && yarn run build"
            ]
        ])
        ->beforeStage('transfer', 'YarnInstallAndBuildTask', $application);
});
