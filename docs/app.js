const groups=[["Compute & Containers",[["Amazon EC2","amazon-elastic-compute-cloud-ec2"],["Amazon ECS","amazon-elastic-container-service-ecs"],["Amazon ECR","amazon-elastic-container-registry-ecr"],["Amazon EKS","amazon-elastic-kubernetes-service-eks"],["AWS Lambda","aws-lambda"]]],["Networking",[["Amazon VPC","amazon-virtual-private-cloud-vpc"],["Route 53","amazon-route-53"],["Elastic Load Balancing","amazon-elastic-load-balancing-elb"],["Transfer Family","aws-transfer-family"],["Direct Connect","aws-direct-connect"]]],["Storage",[["Amazon S3","amazon-simple-storage-service-s3"],["Amazon EBS","amazon-elastic-block-store-ebs"],["Amazon EFS","amazon-elastic-file-system-efs"]]],["Databases",[["Amazon RDS","amazon-relational-database-service-rds"],["Amazon Aurora","amazon-aurora"],["Amazon DynamoDB","amazon-dynamodb"],["Amazon Redshift","amazon-redshift"]]],["Application Integration",[["Amazon SQS","amazon-simple-queue-service-sqs"],["Amazon SNS","amazon-simple-notification-service-sns"],["API Gateway","amazon-api-gateway"],["Amazon Cognito","amazon-cognito"],["EventBridge","amazon-eventbridge"],["Step Functions","aws-step-functions"],["Amazon Kinesis","amazon-kinesis"]]],["Security",[["IAM","aws-identity-and-access-management-iam"],["KMS","aws-key-management-service-kms"],["Security Hub","aws-security-hub"],["GuardDuty","amazon-guardduty"],["Inspector","amazon-inspector"],["Macie","amazon-macie"],["IAM Access Analyzer","aws-iam-access-analyzer"]]],["Management & Operations",[["CloudWatch","amazon-cloudwatch"],["CloudTrail","aws-cloudtrail"],["CloudFormation","aws-cloudformation"],["Systems Manager","aws-systems-manager"],["Well-Architected Framework","aws-well-architected-framework"]]],["Architecture & Cost",[["AWS Core Services","aws-core-services"],["Networking & Security Services","aws-networking-and-security-services"],["Deployment & Management Services","aws-deployment-and-management-services"],["Cost Optimization Strategies","aws-cost-optimization-strategies"]]],["Developer Tools",[["CodePipeline","aws-codepipeline"],["CodeBuild","aws-codebuild"],["CodeDeploy","aws-codedeploy"],["CodeCommit","aws-codecommit"]]]];
const base="https://github.com/Markkaruga254/AWS-Solutions-Architect-Associate-Exam-2026/blob/main/README.md#";
const key="saa2026-progress";
let progress=JSON.parse(localStorage.getItem(key)||"{}");
const nav=document.querySelector("#nav"),cards=document.querySelector("#cards"),search=document.querySelector("#search");
const all=groups.flatMap(g=>g[1].map(x=>({...x,group:g[0]})));
document.querySelector("#total").textContent=all.length;
function toggle(anchor){progress[anchor]=!progress[anchor];if(!progress[anchor])delete progress[anchor];localStorage.setItem(key,JSON.stringify(progress));render(search.value)}
function render(q=""){
 q=q.trim().toLowerCase();nav.innerHTML="";cards.innerHTML="";let shown=0;
 for(const [group,items] of groups){
  const matches=items.filter(([n])=>n.toLowerCase().includes(q)||group.toLowerCase().includes(q));if(!matches.length)continue;
  const ng=document.createElement("div");ng.className="nav-group";const groupDone=items.filter(([,a])=>progress[a]).length;
  ng.innerHTML="<div class='nav-heading'><h3>"+group+"</h3><span>"+groupDone+"/"+items.length+"</span></div>";
  const grid=document.createElement("div");grid.className="card-grid";
  for(const [name,anchor] of matches){
   shown++;const done=!!progress[anchor];
   const row=document.createElement("div");row.className="nav-row";
   row.innerHTML="<button class='nav-check "+(done?"checked":"")+"' aria-label='Toggle "+name+"'>"+(done?"✓":"")+"</button><a class='nav-item "+(done?"done":"")+"' href='"+base+anchor+"' target='_blank'><span>"+name+"</span><b>→</b></a>";
   row.querySelector(".nav-check").onclick=()=>toggle(anchor);ng.appendChild(row);
   const c=document.createElement("article");c.className="card "+(done?"done":"");
   c.innerHTML="<div class='card-top'><span class='tag'>"+group+"</span><button class='check' aria-label='Mark "+name+" reviewed'>"+(done?"✓":"○")+"</button></div><h3>"+name+"</h3><a href='"+base+anchor+"' target='_blank'>Open notes →</a>";
   c.querySelector(".check").onclick=()=>toggle(anchor);grid.appendChild(c);
  }
  nav.appendChild(ng);cards.appendChild(grid);
 }
 document.querySelector("#resultCount").textContent=shown+" topics";updateStats();
}
function updateStats(){const done=all.filter(([,a])=>progress[a]).length,pct=all.length?Math.round(done/all.length*100):0;document.querySelector("#done").textContent=pct+"%";const bar=document.querySelector("#progressBar");if(bar)bar.style.width=pct+"%";const text=document.querySelector("#progressText");if(text)text.textContent=done+" of "+all.length+" topics completed"}
search.addEventListener("input",()=>render(search.value));
document.querySelector("#reset").onclick=()=>{if(confirm("Reset all study progress?")){progress={};localStorage.removeItem(key);render(search.value)}};
render();